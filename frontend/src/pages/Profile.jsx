import Form from "../components/Form";
import Navbar from "../components/Navbar";
import { profile } from "../services/auth.service";
import { useState, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
    <main className="profile_page">
      <Navbar />
      <div className="sections py-10">
        <div>
          <div className="grid max-w-3xl gap-4 px-4 mx-auto lg:grid-cols-2 lg:gap-6 xl:gap-10">
            <div className="space-y-4 lg:col-span-2">
              <div className="flex items-center space-x-4">
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
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Passionate about building accessible and inclusive web
                experiences.
              </p>
            </div>
            <div className="space-y-4">
              <Card className="py-4">
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Correo</Label>
                    <Input id="name" value={userProfile.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Rut</Label>
                    <Input id="rut" value={userProfile.rut} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Celular</Label>
                    <Input id="celular" value={userProfile.celular} />
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
        </div>
        <div className="form"></div>
      </div>
    </main>
  );
};

export default Profile;
