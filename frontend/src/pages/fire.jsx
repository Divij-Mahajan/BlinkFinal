import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FileUploadForm() {
  return (
    <form className="max-w-md mx-auto p-6 bg-card rounded-lg shadow">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file">Choose a file</Label>
          <Input id="file" type="file" />
        </div>
        <Button type="submit" className="w-full">
          Upload
        </Button>
      </div>
    </form>
  )
}