"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  User,
  Mail,
  Globe,
  Twitter,
  Bell,
  Shield,
  Upload,
  Save,
  AlertCircle,
} from "lucide-react";
import { mockCurrentUser } from "@/shared/utils/mock/profile";

export function ProfileSettings() {
  const [profile, setProfile] = useState({
    username: mockCurrentUser.username || "",
    displayName: mockCurrentUser.displayName || "",
    bio: mockCurrentUser.bio || "",
    email: mockCurrentUser.email || "",
    website: mockCurrentUser.website || "",
    twitter: mockCurrentUser.twitter || "",
    discord: mockCurrentUser.discord || "",
  });

  const [notifications, setNotifications] = useState({
    sales: true,
    purchases: true,
    bids: true,
    offers: true,
    followers: true,
    newsletter: false,
  });

  const [privacy, setPrivacy] = useState({
    showEmail: false,
    showActivity: true,
    showCollections: true,
    showOffers: true,
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    console.log("Saving profile:", profile);
  };

  const handleSaveNotifications = () => {
    console.log("Saving notifications:", notifications);
  };

  const handleSavePrivacy = () => {
    console.log("Saving privacy:", privacy);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile information and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>
                Update your avatar and banner images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="space-y-4">
                  <Label>Avatar</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={mockCurrentUser.avatar} />
                      <AvatarFallback>
                        {mockCurrentUser.displayName?.[0] || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New
                    </Button>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <Label>Banner</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: 1400x400px
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">
                    <User className="h-4 w-4 inline mr-1" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) =>
                      handleProfileChange("username", e.target.value)
                    }
                    placeholder="username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={profile.displayName}
                    onChange={(e) =>
                      handleProfileChange("displayName", e.target.value)
                    }
                    placeholder="Your Name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website">
                  <Globe className="h-4 w-4 inline mr-1" />
                  Website
                </Label>
                <Input
                  id="website"
                  type="url"
                  value={profile.website}
                  onChange={(e) =>
                    handleProfileChange("website", e.target.value)
                  }
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter">
                    <Twitter className="h-4 w-4 inline mr-1" />
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    value={profile.twitter}
                    onChange={(e) =>
                      handleProfileChange("twitter", e.target.value)
                    }
                    placeholder="@username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discord">Discord</Label>
                  <Input
                    id="discord"
                    value={profile.discord}
                    onChange={(e) =>
                      handleProfileChange("discord", e.target.value)
                    }
                    placeholder="username#1234"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSaveProfile} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Profile Changes
          </Button>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <Bell className="h-5 w-5 inline mr-2" />
                Email Notifications
              </CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries({
                sales: "When someone buys your NFT",
                purchases: "Purchase confirmations",
                bids: "New bids on your auctions",
                offers: "New offers on your NFTs",
                followers: "New followers",
                newsletter: "Weekly newsletter and updates",
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="flex-1 cursor-pointer">
                    {label}
                  </Label>
                  <Switch
                    id={key}
                    checked={notifications[key as keyof typeof notifications]}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, [key]: checked }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Button onClick={handleSaveNotifications} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Notification Preferences
          </Button>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <Shield className="h-5 w-5 inline mr-2" />
                Privacy Settings
              </CardTitle>
              <CardDescription>
                Control what others can see on your profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries({
                showEmail: "Show email address on profile",
                showActivity: "Show activity history",
                showCollections: "Show owned collections",
                showOffers: "Show offers received",
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="flex-1 cursor-pointer">
                    {label}
                  </Label>
                  <Switch
                    id={key}
                    checked={privacy[key as keyof typeof privacy]}
                    onCheckedChange={(checked) =>
                      setPrivacy((prev) => ({ ...prev, [key]: checked }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20 bg-yellow-500/5">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium">Wallet Address</p>
                  <p className="text-sm text-muted-foreground">
                    Your wallet address is always public and cannot be hidden.
                    This is required for blockchain transparency.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSavePrivacy} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Privacy Settings
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
