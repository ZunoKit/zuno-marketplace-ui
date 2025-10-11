"use client";

import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Download, Smartphone, Monitor, Shield } from "lucide-react";
import Image from "next/image";
import { type Wallet } from "@/shared/types/wallet";

interface WalletCardProps {
  wallet: Wallet;
  onConnect?: (wallet: Wallet) => void;
}

export function WalletCard({ wallet, onConnect }: WalletCardProps) {
  const handleConnect = () => {
    if (onConnect) {
      onConnect(wallet);
    }
  };

  const getPlatformLinks = () => {
    const links = [];

    if (wallet.chromeExtensionUrl) {
      links.push({
        name: "Chrome",
        url: wallet.chromeExtensionUrl,
        icon: <Monitor className="h-4 w-4" />,
      });
    }

    if (wallet.firefoxExtensionUrl) {
      links.push({
        name: "Firefox",
        url: wallet.firefoxExtensionUrl,
        icon: <Monitor className="h-4 w-4" />,
      });
    }

    if (wallet.mobileAppUrl?.ios) {
      links.push({
        name: "iOS",
        url: wallet.mobileAppUrl.ios,
        icon: <Smartphone className="h-4 w-4" />,
      });
    }

    if (wallet.mobileAppUrl?.android) {
      links.push({
        name: "Android",
        url: wallet.mobileAppUrl.android,
        icon: <Smartphone className="h-4 w-4" />,
      });
    }

    return links;
  };

  const platformLinks = getPlatformLinks();

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 flex-shrink-0">
            <Image src={wallet.icon} alt={wallet.name} fill className="object-contain" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold">{wallet.name}</h3>
              {wallet.isPopular && (
                <Badge variant="secondary" className="text-xs">
                  Popular
                </Badge>
              )}
              {wallet.isInstalled && (
                <Badge className="text-xs bg-green-500/10 text-green-500">Installed</Badge>
              )}
            </div>

            {wallet.description && (
              <p className="text-sm text-muted-foreground mb-3">{wallet.description}</p>
            )}

            {/* Features */}
            {wallet.features.length > 0 && (
              <div className="space-y-1 mb-3">
                {wallet.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{feature.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Supported Chains */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">Supports:</span>
              {wallet.supportedChains.slice(0, 3).map(chain => (
                <Badge key={chain.id} variant="outline" className="text-xs">
                  {chain.name}
                </Badge>
              ))}
              {wallet.supportedChains.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{wallet.supportedChains.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {wallet.isInstalled ? (
          <Button onClick={handleConnect} className="flex-1">
            Connect
          </Button>
        ) : (
          <>
            {platformLinks.length > 0 ? (
              <div className="flex gap-2 flex-1">
                {platformLinks.map(link => (
                  <Button key={link.name} variant="outline" size="sm" asChild className="flex-1">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      {link.icon}
                      {link.name}
                    </a>
                  </Button>
                ))}
              </div>
            ) : wallet.downloadUrl ? (
              <Button variant="outline" asChild className="flex-1">
                <a
                  href={wallet.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </Button>
            ) : (
              <Button variant="outline" disabled className="flex-1">
                Not Available
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
