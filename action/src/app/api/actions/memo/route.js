import {ActionGetResponse, ACTIONS_CORS_HEADERS, createPostResponse, MEMO_PROGRAM_ID} from "@solana/actions"
import { clusterApiUrl, ComputeBudgetInstruction, ComputeBudgetProgram, Connection,Keypair,  PublicKey, Transaction, TransactionInstruction, SystemProgram,LAMPORTS_PER_SOL } from "@solana/web3.js";
import axios from 'axios';
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Program, BN, AnchorProvider} from '@project-serum/anchor';

const API_URL = "https://sublinks.onrender.com";

function USD2SOL(price) {
    return (price * 0.0065).toFixed(2);
}

const getBlinkById = async (id) => {
    let apiResponse;
    const externalApiUrl = `${API_URL}/blinks/${id}`;
    const response = await fetch(externalApiUrl);
    if (!response.ok) {
        return null;
    }
    apiResponse = await response.json();
    return apiResponse;
}

const addSubscriberToCreator = async (id, userAddress) => {
    console.log("Adding subscriber to creator")
    let apiResponse;
    const response = await axios.put(`${API_URL}/creator/${id}/subscriber/${userAddress}`)
    console.log(response)
    if (!response.ok) {
        console.log("Error adding subscriber")
        return null;
    }
    apiResponse = await response.json();
    console.log(apiResponse);
    return apiResponse;
}

export const GET = async (req) => {
    let cid=(new URL(req.url).searchParams).get("cid");
    let pid=(new URL(req.url).searchParams).get("pid");

    let apiResponse = await getBlinkById(pid);
    
    let payload;

    let payPerView = apiResponse.type == 'ppv'; 
    let creatorName = apiResponse.creator.name
    let imageUnPaid = apiResponse.image
    let titleUnPaid =  apiResponse.title
    let contentUnPaid= apiResponse.content
    let subscriptionPrice = apiResponse.creator.subscriptionPrice
    let price = apiResponse.price


    if (payPerView) {
        payload = {
            icon: imageUnPaid,
            label:"Verify",
            description:contentUnPaid,
            title: titleUnPaid,
            links:{
                actions:[
                    {
                        label:`View Once for $${price}`,
                        href:`/api/actions/memo?cid=${cid}&pid=${pid}&pay=1`
                    }
                ]
            }
        }
    } else {
        payload = {
            icon: imageUnPaid,
            label: "Verify",
            description: contentUnPaid,
            title: titleUnPaid,
            links:{
                actions:[
                    {
                        label:"Already Subscribed?",
                        href:`/api/actions/memo?cid=${cid}&pid=${pid}`
                    },
                    {
                        label:`Subscribe for $${subscriptionPrice}`,
                        href:`/api/actions/memo?cid=${cid}&pid=${pid}&pay=1`
                    }
                ]
            }
        }
    }


    return Response.json(payload,{
        headers:ACTIONS_CORS_HEADERS
    })
}

export const OPTIONS = GET;

const programId = new PublicKey('4e18RDf2EUkYciY7rLKU6wytfZEBruXXhDfE79LSpbuc');

const idlString = JSON.stringify({
    "address": "4e18RDf2EUkYciY7rLKU6wytfZEBruXXhDfE79LSpbuc",
    "metadata": {
        "name": "counter",
        "version": "0.1.0",
        "spec": "0.1.0",
        "description": "Created with Anchor"
    },
    "instructions": [
        {
        "name": "send_sol",
        "discriminator": [
            214,
            24,
            219,
            18,
            3,
            205,
            201,
            179
        ],
        "accounts": [
            {
            "name": "recipient",
            "writable": true
            },
            {
            "name": "system_program",
            "address": "11111111111111111111111111111111"
            },
            {
            "name": "signer",
            "writable": true,
            "signer": true
            }
        ],
        "args": [
            {
            "name": "amount",
            "type": "u64"
            }
        ]
        }
    ],
    "errors": [
        {
        "code": 6000,
        "name": "TransferFailed",
        "msg": "transfer failed"
        }
    ]
    });
    const idl = JSON.parse(idlString);
    

export const POST = async (req) => {
    try{
        let cid = (new URL(req.url).searchParams).get("cid");
        let pid = (new URL(req.url).searchParams).get("pid");
        let pay = (new URL(req.url).searchParams).get("pay");

        const body = await req.json()
        let account,payload;

        try{
            account = new PublicKey(body.account)
        } catch (err) {
            return new Response("Invalid User Account",{
                status:400,
                headers:ACTIONS_CORS_HEADERS
            })
        }

        let apiResponse = await getBlinkById(pid);
        
        let subscribed = false;

        subscribed = apiResponse.creator.subscribers.some(subscriber => subscriber.walletAddress === String(account));

        let imagePaid = apiResponse.premiumImage
        let titlePaid = apiResponse.premiumTitle
        let contentPaid = apiResponse.premiumContent
        let price = apiResponse.price
        let imageUnPaid = apiResponse.image
        let creatorWallet=apiResponse.creator.walletAddress
        let subscriptionPrice=apiResponse.creator.subscriptionPrice
        let payPerView = apiResponse.type == 'ppv'; 
        let createdId = apiResponse.creator._id

        if (pay == 1) {
            let amount1;
            if(payPerView){
                amount1=price
            }else{
                amount1=subscriptionPrice
            }
            amount1=USD2SOL(amount1)

            //let amount2=0.3
            const transaction=new Transaction()
            transaction.add(
                ComputeBudgetProgram.setComputeUnitPrice({
                    microLamports:1000,
                }),
                SystemProgram.transfer({
                    fromPubkey: account,
                    toPubkey: creatorWallet,
                    lamports: amount1 * LAMPORTS_PER_SOL
                }),
            )

            transaction.feePayer = account
            const connection = new Connection(clusterApiUrl("devnet"))
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
            
            await addSubscriberToCreator(createdId, account)

            payload = await createPostResponse({
                fields:{
                    transaction,
                    message:"hi",
                    links:{
                        next:{
                            type:"inline",
                            action:{
                                icon: imagePaid,
                                description: contentPaid,
                                title: titlePaid,
                                label: "Payment Successful",
                                disabled: true
                            }
                        }
                    }
                }
            })
        } else {
            const transaction=new Transaction()

    
            transaction.feePayer = account
            const connection = new Connection(clusterApiUrl("devnet"))
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
            transaction.add(
                ComputeBudgetProgram.setComputeUnitPrice({
                    microLamports:1000,
                }),
      
                
                new TransactionInstruction({
                    programId:new PublicKey(MEMO_PROGRAM_ID),
                    data:Buffer.from("Verifying...","utf-8"),
                    keys:[],
                })
            )
            if (subscribed) {
                payload = await createPostResponse({
                    fields:{
                        transaction,
                        message:"hi",
                        links:{
                            next:{
                                type: "inline",
                                action:{
                                    icon: imagePaid,
                                    description: contentPaid,
                                    title: titlePaid,
                                    label: "Subscribed",
                                    disabled: true
                                }
                            }
                        }
                    }
                })
            } else {
                payload = await createPostResponse({
                    fields:{
                        transaction,
                        message:"Not Paid",
                        links:{
                            next:{
                                type:"inline",
                                action:{
                                    icon: imageUnPaid,
                                    label:"Proceed & Pay",
                                    description:"The following content can be only be accessed after successful payment.",
                                    title:`Subscription Price : $${subscriptionPrice}`,
                                    links:{
                                        actions:[{
                                            label:"Proceed & Pay",
                                            href:`/api/actions/memo?cid=${cid}&pid=${pid}&pay=1`
                                        }]
                                    }
                                }
                            }
                        }
                    }
                })
            }
            
        }
        return Response.json(payload,{headers:ACTIONS_CORS_HEADERS})
    } catch (err) {
        console.error(err)
        return Response.json(err,{status:400,headers:ACTIONS_CORS_HEADERS})
    }
}