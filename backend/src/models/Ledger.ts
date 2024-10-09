import mongoose, { Document, Schema } from 'mongoose';

export interface LedgerDoc extends Document {
  name: string;
  founder: mongoose.Schema.Types.ObjectId;
}

const ledgerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    // founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Ledger = mongoose.model<LedgerDoc>('Ledger', ledgerSchema);

export default Ledger;