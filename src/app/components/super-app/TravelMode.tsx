import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plane, MapPin, Users, Calendar } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface TravelModeProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

export function TravelMode({ userRole }: TravelModeProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Plane className="w-6 h-6 text-primary" />
            <CardTitle>Travel Mode</CardTitle>
          </div>
          <CardDescription>
            Connect with alumni wherever you travel
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Where are you traveling?</CardTitle>
          <CardDescription>Let us help you connect with local alumni</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="destination">Destination City</Label>
              <Input id="destination" placeholder="e.g., San Francisco" />
            </div>
            <div>
              <Label htmlFor="dates">Travel Dates</Label>
              <Input id="dates" type="date" />
            </div>
          </div>
          <Button className="w-full">Find Alumni Nearby</Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-medium mb-1">Local Connections</h4>
            <p className="text-sm text-muted-foreground">
              Meet alumni in your destination
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-medium mb-1">Local Events</h4>
            <p className="text-sm text-muted-foreground">
              Discover events during your visit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-medium mb-1">City Tips</h4>
            <p className="text-sm text-muted-foreground">
              Get recommendations from locals
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}