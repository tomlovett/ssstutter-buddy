import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card'
import { Input } from '@ui/input'
import { Label } from '@ui/label'

const UserShow = ({ user }) => {
  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Hola Muchacho</h3>
        </CardTitle>
        <CardDescription>Make changes to your account here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">First name</Label>
          <Input id="fname" defaultValue={user.first_name} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Last name</Label>
          <Input id="username" defaultValue={user.last_name} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Email</Label>
          <Input id="email" defaultValue={user.email} />
        </div>
      </CardContent>
    </Card>
  )
}

export default UserShow
