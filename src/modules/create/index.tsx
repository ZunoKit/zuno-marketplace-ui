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
import { Badge } from "@/shared/components/ui/badge";
import {
  Package,
  Image as ImageIcon,
  Layers,
  Sparkles,
  Rocket,
  Shield,
  Coins,
  Users,
} from "lucide-react";
import Link from "next/link";

export function CreateHub() {
  const [selectedOption, setSelectedOption] = useState<"nft" | "collection" | null>(null);

  const createOptions = [
    {
      id: "nft",
      title: "Create NFT",
      description: "Mint a single NFT to an existing collection",
      icon: ImageIcon,
      features: [
        "Quick and easy minting",
        "Add to existing collection",
        "Set royalties and properties",
        "Immediate listing",
      ],
      href: "/mint/create",
      badge: "Quick",
      color: "from-blue-500 to-purple-500",
    },
    {
      id: "collection",
      title: "Create Collection",
      description: "Launch your own NFT collection with custom settings",
      icon: Layers,
      features: [
        "Custom smart contract",
        "Bulk minting options",
        "Advanced royalty settings",
        "Collection page & branding",
      ],
      href: "/create/collection",
      badge: "Advanced",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const benefits = [
    {
      icon: Rocket,
      title: "Launch Quickly",
      description: "Get your NFTs to market in minutes, not days",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Audited smart contracts ensure your assets are safe",
    },
    {
      icon: Coins,
      title: "Low Fees",
      description: "Competitive minting fees with no hidden costs",
    },
    {
      icon: Users,
      title: "Built-in Community",
      description: "Access to our marketplace and collector base",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Your NFT</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose how you want to bring your digital assets to life
        </p>
      </div>

      {/* Create Options */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {createOptions.map(option => (
          <Card
            key={option.id}
            className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedOption === option.id
                ? "ring-2 ring-primary shadow-lg scale-[1.02]"
                : "hover:shadow-md"
            }`}
            onClick={() => setSelectedOption(option.id as "nft" | "collection")}
          >
            <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${option.color}`} />

            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${option.color} text-white`}>
                  <option.icon className="h-6 w-6" />
                </div>
                <Badge variant="secondary">{option.badge}</Badge>
              </div>

              <CardTitle className="text-2xl">{option.title}</CardTitle>
              <CardDescription className="text-base">{option.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 mb-6">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full" size="lg" asChild>
                <Link href={option.href}>Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Why Create with Us?</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="mt-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold mb-3">Ready to Create?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join thousands of creators who are already minting and selling their NFTs on our
            platform
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/create/collection">Create Collection</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs/getting-started">View Guide</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
