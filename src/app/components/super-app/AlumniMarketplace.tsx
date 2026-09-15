import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ShoppingBag, Briefcase, DollarSign, Star } from 'lucide-react';

interface AlumniMarketplaceProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

const services = [
  {
    id: 1,
    provider: 'Rajesh Kumar',
    service: 'Tech Consulting',
    category: 'Consulting',
    rate: '$150/hour',
    rating: 4.9,
    reviews: 24
  },
  {
    id: 2,
    provider: 'Priya Menon',
    service: 'Product Strategy',
    category: 'Consulting',
    rate: '$200/hour',
    rating: 5.0,
    reviews: 18
  },
  {
    id: 3,
    provider: 'Amit Patel',
    service: 'Legal Advisory',
    category: 'Professional Services',
    rate: '$180/hour',
    rating: 4.8,
    reviews: 31
  }
];

export function AlumniMarketplace({ userRole }: AlumniMarketplaceProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/20">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <CardTitle>Alumni Marketplace</CardTitle>
          </div>
          <CardDescription>
            Discover and book services from fellow alumni
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="services">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="businesses">Businesses</TabsTrigger>
          <TabsTrigger value="my-offerings">My Offerings</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          {services.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    {service.provider.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{service.service}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {service.provider}</p>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge variant="secondary">{service.category}</Badge>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="font-medium">{service.rating}</span>
                        <span className="text-muted-foreground">({service.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">{service.rate}</span>
                      <div className="flex gap-2">
                        <Button>Book Now</Button>
                        <Button variant="outline">Learn More</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="businesses">
          <Card>
            <CardContent className="p-12 text-center">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-medium mb-1">Alumni Businesses</h3>
              <p className="text-sm text-muted-foreground">
                Discover businesses owned and operated by fellow alumni
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-offerings">
          <Card>
            <CardHeader>
              <CardTitle>List Your Services</CardTitle>
              <CardDescription>Share your expertise with the BITS community</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Create Service Listing</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}