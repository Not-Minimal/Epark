import Navbar from "../components/Navbar";
import { profile } from "../services/auth.service";
import { useState, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Form from "@/components/Form";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    rut: "",
    celular: "",
    rolName: "",
  });

  useEffect(() => {
    async function dataProfile() {
      try {
        const { data } = await profile();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    dataProfile();
  }, []);

  return (
    <main className="profile_page flex-grow flex-col min-h-screen">
      <Navbar />
      {/* <nav className="bg-gray-950 min-h-16 items-center justify-center text-3xl text-white p-8">
        Mi Perfil
      </nav> */}
      <div className="sections py-8  justify-center items-center flex min-h-full"></div>
      <div className="flex min-h-full items-center justify-center p-8">
        <div className="max-w-3xl w-full space-y-6 bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
          <Card className="py-4">
            <CardContent className="space-y-4">
              <Avatar className="w-12 h-12">
                <img
                  src="profile.png"
                  width="96"
                  height="96"
                  alt="Avatar"
                  className="rounded-full"
                />
              </Avatar>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">{userProfile.username}</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  {userProfile.rolName.toUpperCase()}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo</Label>
                <Input id="email" value={userProfile.email} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rut">Rut</Label>
                <Input id="rut" value={userProfile.rut} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="celular">Celular</Label>
                <Input id="celular" value={userProfile.celular} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Enter your bio"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Profile;
