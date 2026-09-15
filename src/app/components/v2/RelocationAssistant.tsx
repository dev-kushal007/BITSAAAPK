import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { MapPin, Users, Home, MessageSquare, ArrowLeft, Phone, Mail, Building, Car, Utensils } from 'lucide-react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

interface RelocationAssistantProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

const cities = [
  { 
    name: 'Bengaluru', 
    alumni: 1250, 
    cityBuddies: 45,
    description: 'Tech capital of India with thriving startup ecosystem',
    neighborhoods: ['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield'],
    avgRent: '₹25,000 - ₹40,000',
    transport: 'Metro, Buses, Cabs',
    weather: 'Pleasant year-round'
  },
  { 
    name: 'Mumbai', 
    alumni: 980, 
    cityBuddies: 38,
    description: 'Financial capital with diverse opportunities',
    neighborhoods: ['Bandra', 'Powai', 'Andheri', 'Lower Parel'],
    avgRent: '₹35,000 - ₹60,000',
    transport: 'Local Trains, Metro, Buses',
    weather: 'Humid, hot summers'
  },
  { 
    name: 'Silicon Valley', 
    alumni: 650, 
    cityBuddies: 28,
    description: 'Global tech hub with world-class companies',
    neighborhoods: ['Sunnyvale', 'Mountain View', 'Palo Alto', 'San Jose'],
    avgRent: '$3,000 - $4,500',
    transport: 'Caltrain, BART, Cars',
    weather: 'Mild, Mediterranean climate'
  },
  { 
    name: 'London', 
    alumni: 320, 
    cityBuddies: 15,
    description: 'Global financial center with rich culture',
    neighborhoods: ['Canary Wharf', 'Shoreditch', 'Camden', 'Kensington'],
    avgRent: '£1,800 - £2,800',
    transport: 'Tube, Buses, Overground',
    weather: 'Rainy, mild temperatures'
  },
  { 
    name: 'Singapore', 
    alumni: 420, 
    cityBuddies: 22,
    description: 'Asian financial hub with multicultural environment',
    neighborhoods: ['CBD', 'Marina Bay', 'Orchard', 'East Coast'],
    avgRent: 'S$2,500 - S$4,000',
    transport: 'MRT, Buses, Taxis',
    weather: 'Hot and humid year-round'
  }
];

const mockBuddies = [
  {
    id: 1,
    name: 'Rahul Sharma',
    batch: '2015',
    profession: 'Software Engineer',
    yearsInCity: 5,
    specialties: ['Housing', 'Networking', 'Transportation'],
    available: true
  },
  {
    id: 2,
    name: 'Priya Menon',
    batch: '2013',
    profession: 'Product Manager',
    yearsInCity: 7,
    specialties: ['Restaurants', 'Neighborhoods', 'Schools'],
    available: true
  },
  {
    id: 3,
    name: 'Amit Patel',
    batch: '2016',
    profession: 'Data Scientist',
    yearsInCity: 4,
    specialties: ['Housing', 'Healthcare', 'Recreation'],
    available: true
  }
];

export function RelocationAssistant({ userRole }: RelocationAssistantProps) {
  const [selectedCity, setSelectedCity] = useState('');
  const [showBuddyList, setShowBuddyList] = useState(false);
  const [showCityGuide, setShowCityGuide] = useState(false);

  const cityData = cities.find(c => c.name === selectedCity);

  // City Guide View
  if (showCityGuide && cityData) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-4"
              onClick={() => setShowCityGuide(false)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="space-y-6">
              {/* City Header */}
              <div>
                <h1 className="text-2xl font-semibold mb-2">{cityData.name} City Guide</h1>
                <p className="text-muted-foreground">{cityData.description}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Home className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Average Rent</p>
                  <p className="font-semibold">{cityData.avgRent}</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Car className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Transportation</p>
                  <p className="font-semibold">{cityData.transport}</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <MapPin className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Weather</p>
                  <p className="font-semibold">{cityData.weather}</p>
                </div>
              </div>

              {/* Popular Neighborhoods */}
              <div>
                <h3 className="font-medium mb-3">Popular Neighborhoods</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {cityData.neighborhoods.map((neighborhood, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-5 h-5 text-primary" />
                        <h4 className="font-medium">{neighborhood}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Great for professionals, good connectivity
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips from Alumni */}
              <div>
                <h3 className="font-medium mb-3">Tips from Alumni</h3>
                <div className="space-y-3">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium">R</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1">Rahul Sharma (2015)</p>
                          <p className="text-sm text-muted-foreground">
                            "Start looking for housing at least 2 months before your move. Use local Facebook groups and alumni networks for better deals."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium">P</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1">Priya Menon (2013)</p>
                          <p className="text-sm text-muted-foreground">
                            "Get familiar with local transportation apps. Public transport is very reliable and saves a lot of money."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Connect with City Buddies */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h4 className="font-medium mb-2">Need More Help?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with {cityData.cityBuddies} alumni who volunteered to help newcomers
                  </p>
                  <Button onClick={() => setShowBuddyList(true)}>Browse City Buddies</Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // City Buddy List View
  if (showBuddyList && cityData) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-4"
              onClick={() => setShowBuddyList(false)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold mb-2">City Buddies in {cityData.name}</h1>
                <p className="text-muted-foreground">
                  Connect with alumni who can help you settle in
                </p>
              </div>

              <div className="space-y-4">
                {mockBuddies.map((buddy) => (
                  <Card key={buddy.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                          <span className="font-medium">{buddy.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{buddy.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {buddy.profession} • Batch of {buddy.batch}
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">
                            Living in {cityData.name} for {buddy.yearsInCity} years
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {buddy.specialties.map((specialty, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          {buddy.available && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm">
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Connect
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Connect with {buddy.name}</DialogTitle>
                                  <DialogDescription>
                                    Send a message to request assistance
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="help-needed">What do you need help with?</Label>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select area" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="housing">Finding Housing</SelectItem>
                                        <SelectItem value="transport">Transportation</SelectItem>
                                        <SelectItem value="neighborhood">Choosing Neighborhood</SelectItem>
                                        <SelectItem value="networking">Professional Networking</SelectItem>
                                        <SelectItem value="general">General Advice</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor="buddy-message">Message</Label>
                                    <Textarea 
                                      id="buddy-message" 
                                      placeholder="Hi! I'm relocating to {cityData.name} next month and would love your guidance..."
                                      rows={4}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="move-date">Expected Move Date</Label>
                                    <Input id="move-date" type="date" />
                                  </div>
                                  <Button className="w-full">Send Request</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main View
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relocation Assistant</CardTitle>
          <CardDescription>Moving to a new city? Connect with alumni who can help you settle in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Where are you moving to?</label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>{city.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCity && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-medium mb-1">Alumni in City</h4>
                  <p className="text-2xl font-semibold text-primary">
                    {cities.find(c => c.name === selectedCity)?.alumni.toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-medium mb-1">City Buddies</h4>
                  <p className="text-2xl font-semibold text-primary">
                    {cities.find(c => c.name === selectedCity)?.cityBuddies}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Home className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-medium mb-1">City Guide</h4>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => setShowCityGuide(true)}
                  >
                    View Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedCity && cityData && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>City Buddy Program</CardTitle>
              <CardDescription>Connect with alumni who volunteer to help newcomers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  City Buddies are experienced alumni living in {selectedCity} who can help you with:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Finding accommodation in good neighborhoods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Understanding local transportation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Discovering the best places to eat and socialize</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Building your professional and social network</span>
                  </li>
                </ul>
                <Button className="w-full mt-4" onClick={() => setShowBuddyList(true)}>
                  Browse City Buddies
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-primary mt-1" />
                <div className="flex-1">
                  <h4 className="font-medium mb-2">Want to Become a City Buddy?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Help fellow alumni relocating to {selectedCity}. Share your local knowledge and expand your network.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Volunteer as City Buddy</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Become a City Buddy</DialogTitle>
                        <DialogDescription>
                          Help newcomers settle into {selectedCity}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Select areas you can help with</Label>
                          <div className="space-y-2 mt-2">
                            {['Housing', 'Transportation', 'Neighborhoods', 'Healthcare', 'Schools', 'Networking'].map((area) => (
                              <div key={area} className="flex items-center gap-2">
                                <input type="checkbox" id={area} className="rounded" />
                                <Label htmlFor={area} className="font-normal cursor-pointer">
                                  {area}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="years">Years in {selectedCity}</Label>
                          <Input id="years" type="number" placeholder="5" />
                        </div>
                        <div>
                          <Label htmlFor="availability">Your Availability</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-2">1-2 hours per week</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                              <SelectItem value="occasional">Occasional</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">Register as City Buddy</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
