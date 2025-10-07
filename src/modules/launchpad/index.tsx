"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Progress } from "@/shared/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import {
  Rocket,
  Clock,
  Users,
  Shield,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LaunchpadProject {
  id: string;
  name: string;
  description: string;
  image: string;
  banner: string;
  status: "upcoming" | "live" | "ended";
  verified: boolean;
  raised: number;
  goal: number;
  participants: number;
  mintPrice: string;
  maxSupply: number;
  startDate: Date;
  endDate: Date;
  website?: string;
  twitter?: string;
  discord?: string;
}

export function LaunchpadPage() {
  // Mock launchpad projects
  const projects: LaunchpadProject[] = [
    {
      id: "1",
      name: "Cyber Punks 3000",
      description:
        "Next-gen cyberpunk NFT collection with utility in the metaverse",
      image: "https://picsum.photos/400/400?random=301",
      banner: "https://picsum.photos/1200/400?random=302",
      status: "live",
      verified: true,
      raised: 234.5,
      goal: 500,
      participants: 1234,
      mintPrice: "0.08",
      maxSupply: 10000,
      startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      website: "https://example.com",
      twitter: "@cyberpunks3000",
      discord: "discord.gg/cyberpunks",
    },
    {
      id: "2",
      name: "Fantasy Realms",
      description: "Epic fantasy adventure NFTs with P2E gaming integration",
      image: "https://picsum.photos/400/400?random=303",
      banner: "https://picsum.photos/1200/400?random=304",
      status: "upcoming",
      verified: true,
      raised: 0,
      goal: 300,
      participants: 0,
      mintPrice: "0.05",
      maxSupply: 5000,
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      name: "Art Genesis",
      description: "Generative art collection by renowned digital artists",
      image: "https://picsum.photos/400/400?random=305",
      banner: "https://picsum.photos/1200/400?random=306",
      status: "ended",
      verified: false,
      raised: 450,
      goal: 400,
      participants: 2345,
      mintPrice: "0.1",
      maxSupply: 3333,
      startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  ];

  const getProjectProgress = (project: LaunchpadProject) => {
    return Math.min((project.raised / project.goal) * 100, 100);
  };

  const getTimeLeft = (endDate: Date) => {
    const diff = endDate.getTime() - Date.now();
    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  const renderProjectCard = (project: LaunchpadProject) => (
    <Card key={project.id} className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={project.banner}
          alt={project.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge
            variant={
              project.status === "live"
                ? "default"
                : project.status === "upcoming"
                  ? "secondary"
                  : "outline"
            }
            className="backdrop-blur"
          >
            {project.status === "live" && <Rocket className="h-3 w-3 mr-1" />}
            {project.status.toUpperCase()}
          </Badge>
          {project.verified && (
            <Badge className="backdrop-blur bg-green-500/90">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-end gap-3">
            <Image
              src={project.image}
              alt={project.name}
              width={64}
              height={64}
              className="rounded-lg border-2 border-background"
            />
            <div>
              <h3 className="text-xl font-bold text-white">{project.name}</h3>
              <p className="text-sm text-white/80">
                {project.mintPrice} ETH • {project.maxSupply.toLocaleString()}{" "}
                items
              </p>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <p className="text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {project.raised} / {project.goal} ETH (
              {getProjectProgress(project).toFixed(1)}%)
            </span>
          </div>
          <Progress value={getProjectProgress(project)} className="h-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Participants</p>
            <p className="font-semibold">
              {project.participants.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Mint Price</p>
            <p className="font-semibold">{project.mintPrice} ETH</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Time</p>
            <p className="font-semibold">{getTimeLeft(project.endDate)}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {project.status === "live" ? (
            <Button className="flex-1" asChild>
              <Link href={`/launch-pad/${project.id}`}>Join Mint</Link>
            </Button>
          ) : project.status === "upcoming" ? (
            <Button className="flex-1" variant="secondary" disabled>
              <Clock className="h-4 w-4 mr-2" />
              Coming Soon
            </Button>
          ) : (
            <Button className="flex-1" variant="outline" asChild>
              <Link
                href={`/marketplace/${project.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                View Collection
              </Link>
            </Button>
          )}
          <Button variant="outline" size="icon">
            <Shield className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Rocket className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Launchpad</h1>
        </div>
        <p className="text-muted-foreground">
          Discover and invest in upcoming NFT projects vetted by our team
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Raised</p>
                <p className="text-xl font-bold">1,234 ETH</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Rocket className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Projects Launched
                </p>
                <p className="text-xl font-bold">45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Participants
                </p>
                <p className="text-xl font-bold">23.5K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-xl font-bold">92%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Tabs */}
      <Tabs defaultValue="live" className="space-y-6">
        <TabsList>
          <TabsTrigger value="live">
            Live Now ({projects.filter((p) => p.status === "live").length})
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming ({projects.filter((p) => p.status === "upcoming").length})
          </TabsTrigger>
          <TabsTrigger value="ended">
            Ended ({projects.filter((p) => p.status === "ended").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter((p) => p.status === "live").map(renderProjectCard)}
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((p) => p.status === "upcoming")
              .map(renderProjectCard)}
          </div>
        </TabsContent>

        <TabsContent value="ended">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((p) => p.status === "ended")
              .map(renderProjectCard)}
          </div>
        </TabsContent>
      </Tabs>

      {/* How it Works */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>How Launchpad Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h4 className="font-medium mb-1">Apply</h4>
              <p className="text-sm text-muted-foreground">
                Projects apply and go through our vetting process
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h4 className="font-medium mb-1">Review</h4>
              <p className="text-sm text-muted-foreground">
                Our team reviews and verifies each project
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h4 className="font-medium mb-1">Launch</h4>
              <p className="text-sm text-muted-foreground">
                Approved projects launch on our platform
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-primary">4</span>
              </div>
              <h4 className="font-medium mb-1">Mint</h4>
              <p className="text-sm text-muted-foreground">
                Users can mint NFTs from verified projects
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
