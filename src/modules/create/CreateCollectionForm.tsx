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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Upload, Info, AlertCircle, Plus, Trash2 } from "lucide-react";

export function CreateCollectionForm() {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    category: "",
    website: "",
    twitter: "",
    discord: "",
    royaltyPercentage: "2.5",
    royaltyAddress: "",
    maxSupply: "",
    mintPrice: "",
    revealType: "instant",
    enableWhitelist: false,
    enablePresale: false,
  });

  const [attributes, setAttributes] = useState<Array<{ trait: string; values: string }>>([
    { trait: "", values: "" },
  ]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddAttribute = () => {
    setAttributes([...attributes, { trait: "", values: "" }]);
  };

  const handleRemoveAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const handleAttributeChange = (index: number, field: "trait" | "values", value: string) => {
    const updated = [...attributes];
    updated[index][field] = value;
    setAttributes(updated);
  };

  const handleSubmit = () => {
    console.log("Creating collection:", { ...formData, attributes });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Collection</h1>
        <p className="text-muted-foreground">
          Deploy your own smart contract and launch your NFT collection
        </p>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Collection Details</CardTitle>
              <CardDescription>Basic information about your collection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Collection Name *</Label>
                  <Input
                    id="name"
                    placeholder="My Awesome Collection"
                    value={formData.name}
                    onChange={e => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol *</Label>
                  <Input
                    id="symbol"
                    placeholder="MAC"
                    value={formData.symbol}
                    onChange={e => handleInputChange("symbol", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">3-4 uppercase letters</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your collection..."
                  rows={4}
                  value={formData.description}
                  onChange={e => handleInputChange("description", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={value => handleInputChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="utility">Utility</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Connect your community channels (optional)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={e => handleInputChange("website", e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    placeholder="@username"
                    value={formData.twitter}
                    onChange={e => handleInputChange("twitter", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discord">Discord</Label>
                  <Input
                    id="discord"
                    placeholder="discord.gg/invite"
                    value={formData.discord}
                    onChange={e => handleInputChange("discord", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Collection Images</CardTitle>
              <CardDescription>Upload images for your collection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Logo Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Recommended: 350x350px</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Banner Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Recommended: 1400x400px</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attributes</CardTitle>
              <CardDescription>Define traits for your NFTs (optional)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {attributes.map((attr, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Trait type (e.g., Background)"
                    value={attr.trait}
                    onChange={e => handleAttributeChange(index, "trait", e.target.value)}
                  />
                  <Input
                    placeholder="Values (comma separated)"
                    value={attr.values}
                    onChange={e => handleAttributeChange(index, "values", e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveAttribute(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button variant="outline" onClick={handleAddAttribute} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Attribute
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supply & Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxSupply">Max Supply</Label>
                  <Input
                    id="maxSupply"
                    type="number"
                    placeholder="10000"
                    value={formData.maxSupply}
                    onChange={e => handleInputChange("maxSupply", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Leave empty for unlimited supply</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mintPrice">Mint Price (ETH)</Label>
                  <Input
                    id="mintPrice"
                    type="number"
                    step="0.001"
                    placeholder="0.08"
                    value={formData.mintPrice}
                    onChange={e => handleInputChange("mintPrice", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Royalties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="royaltyPercentage">Royalty Percentage</Label>
                  <Select
                    value={formData.royaltyPercentage}
                    onValueChange={value => handleInputChange("royaltyPercentage", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="2.5">2.5%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="7.5">7.5%</SelectItem>
                      <SelectItem value="10">10%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="royaltyAddress">Royalty Recipient</Label>
                  <Input
                    id="royaltyAddress"
                    placeholder="0x..."
                    value={formData.royaltyAddress}
                    onChange={e => handleInputChange("royaltyAddress", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Whitelist</Label>
                  <p className="text-xs text-muted-foreground">
                    Allow only whitelisted addresses to mint
                  </p>
                </div>
                <Switch
                  checked={formData.enableWhitelist}
                  onCheckedChange={checked => handleInputChange("enableWhitelist", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Presale</Label>
                  <p className="text-xs text-muted-foreground">
                    Set up a presale phase before public mint
                  </p>
                </div>
                <Switch
                  checked={formData.enablePresale}
                  onCheckedChange={checked => handleInputChange("enablePresale", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Your Collection</CardTitle>
              <CardDescription>Make sure everything looks good before deploying</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{formData.name || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Symbol</span>
                  <span className="font-medium">{formData.symbol || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Supply</span>
                  <span className="font-medium">{formData.maxSupply || "Unlimited"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mint Price</span>
                  <span className="font-medium">{formData.mintPrice || "0"} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Royalties</span>
                  <span className="font-medium">{formData.royaltyPercentage}%</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-yellow-500/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <p className="text-sm">
                  Deploying a smart contract requires gas fees. Make sure you have enough ETH in
                  your wallet.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              Save Draft
            </Button>
            <Button className="flex-1" onClick={handleSubmit}>
              Deploy Collection
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
