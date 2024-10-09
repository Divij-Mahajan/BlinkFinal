import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreateBlink() {
  const [isPaid, setIsPaid] = useState(false)
  const subscriptionPrice = 100

  const [formValues, setFormValues] = useState({
    unpaidTitle: 'Unpaid Title',
    paidTitle: 'Paid Title',
    unpaidContent: 'Unpaid Content',
    paidContent: 'Paid Content',
    price: 0.0,
    payPerView: true,
    unpaidImage: '',
    paidImage: ''
  })

  const submissionHandler = (e) => {
    e.preventDefault()
    // Send Data to Mongo Here
    console.log('Form submitted:', formValues)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    const reader = new FileReader()
    const fieldName = isPaid ? 'paidImage' : 'unpaidImage'

    reader.onloadend = () => {
      setFormValues({ ...formValues, [fieldName]: reader.result })
    }

    if (file) reader.readAsDataURL(file)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left-side Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                {isPaid && formValues.paidImage ? (
                  <img src={formValues.paidImage} alt="Preview" className="object-cover w-full h-full" />
                ) : formValues.unpaidImage ? (
                  <img src={formValues.unpaidImage} alt="Preview" className="object-cover w-full h-full" />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No image uploaded
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold">
                {isPaid ? formValues.paidTitle : formValues.unpaidTitle}
              </h2>
              <p className="text-muted-foreground">
                {isPaid ? formValues.paidContent : formValues.unpaidContent}
              </p>
              {!isPaid ? (
                <div className="space-y-2">
                  {!formValues.payPerView ? (
                    <Button className="w-full">View Once For ${formValues.price}</Button>
                  ) : (
                    <>
                      <Button className="w-full">Verify Subscription</Button>
                      <Button className="w-full">Subscribe For ${subscriptionPrice}</Button>
                    </>
                  )}
                </div>
              ) : (
                <Button className="w-full" disabled>Purchased</Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right-side Form */}
        <form onSubmit={submissionHandler}>
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Tabs defaultValue={isPaid ? "paid" : "unpaid"} onValueChange={(value) => setIsPaid(value === "paid")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
                    <TabsTrigger value="paid">Paid</TabsTrigger>
                  </TabsList>
                  <TabsContent value="unpaid">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="unpaidTitle">Title</Label>
                        <Input
                          id="unpaidTitle"
                          name="unpaidTitle"
                          value={formValues.unpaidTitle}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unpaidContent">Content</Label>
                        <Textarea
                          id="unpaidContent"
                          name="unpaidContent"
                          value={formValues.unpaidContent}
                          onChange={handleInputChange}
                          rows={4}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="paid">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="paidTitle">Title</Label>
                        <Input
                          id="paidTitle"
                          name="paidTitle"
                          value={formValues.paidTitle}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paidContent">Content</Label>
                        <Textarea
                          id="paidContent"
                          name="paidContent"
                          value={formValues.paidContent}
                          onChange={handleInputChange}
                          rows={4}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2">
                  <Label htmlFor="price">View Once Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formValues.price}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="payPerView"
                    checked={formValues.payPerView}
                    onCheckedChange={(checked) => setFormValues({ ...formValues, payPerView: checked })}
                  />
                  <Label htmlFor="payPerView">Pay Per View</Label>
                </div>

                <Button type="submit" className="w-full">Save Blink</Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}