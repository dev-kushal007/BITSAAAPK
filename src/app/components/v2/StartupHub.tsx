import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Rocket, TrendingUp, Users, DollarSign, ArrowLeft, MapPin, Calendar, Briefcase, Mail, Globe, Linkedin } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface StartupHubProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

const startups = [
  {
    id: 1,
    name: 'TechVenture AI',
    founder: 'Rajesh Kumar (2015)',
    stage: 'Series A',
    sector: 'AI/ML',
    hiring: true,
    fundraising: false,
    description: 'Building next-generation AI tools for enterprise automation',
    fullDescription: 'TechVenture AI is revolutionizing enterprise workflows with cutting-edge AI and machine learning solutions. Our platform helps businesses automate complex processes, reduce operational costs, and make data-driven decisions with unprecedented accuracy.',
    employees: 45,
    founded: '2020',
    location: 'Bengaluru, India',
    website: 'https://techventureai.com',
    funding: '$5M',
    openPositions: [
      { id: 1, title: 'Senior ML Engineer', type: 'Full-time', location: 'Bengaluru' },
      { id: 2, title: 'Product Manager', type: 'Full-time', location: 'Remote' },
      { id: 3, title: 'Data Scientist', type: 'Full-time', location: 'Bengaluru' }
    ]
  },
  {
    id: 2,
    name: 'HealthTech Solutions',
    founder: 'Priya Menon (2014)',
    stage: 'Seed',
    sector: 'Healthcare',
    hiring: true,
    fundraising: true,
    description: 'Democratizing healthcare access through telemedicine',
    fullDescription: 'HealthTech Solutions is on a mission to make quality healthcare accessible to everyone. Our telemedicine platform connects patients with top doctors, offers AI-powered diagnostics, and provides affordable healthcare solutions to underserved communities.',
    employees: 28,
    founded: '2021',
    location: 'Mumbai, India',
    website: 'https://healthtechsolutions.in',
    funding: '$1.5M',
    fundraisingGoal: '$3M',
    openPositions: [
      { id: 1, title: 'Full Stack Developer', type: 'Full-time', location: 'Mumbai' },
      { id: 2, title: 'Healthcare Operations Manager', type: 'Full-time', location: 'Mumbai' }
    ]
  },
  {
    id: 3,
    name: 'FinFlow',
    founder: 'Amit Patel (2016)',
    stage: 'Series B',
    sector: 'Fintech',
    hiring: false,
    fundraising: false,
    description: 'Simplifying financial management for SMEs',
    fullDescription: 'FinFlow provides comprehensive financial management solutions tailored for small and medium enterprises. From invoicing to expense tracking and financial reporting, we help SMEs manage their finances efficiently and make informed business decisions.',
    employees: 120,
    founded: '2019',
    location: 'Pune, India',
    website: 'https://finflow.io',
    funding: '$15M',
    openPositions: []
  },
  {
    id: 4,
    name: 'EduLearn',
    founder: 'Sneha Reddy (2017)',
    stage: 'Pre-Seed',
    sector: 'EdTech',
    hiring: true,
    fundraising: true,
    description: 'Personalized learning platform for K-12 students',
    fullDescription: 'EduLearn uses AI to create personalized learning paths for K-12 students. Our adaptive platform identifies knowledge gaps and provides targeted content to help students learn at their own pace.',
    employees: 15,
    founded: '2023',
    location: 'Hyderabad, India',
    website: 'https://edulearn.co',
    funding: '$500K',
    fundraisingGoal: '$2M',
    openPositions: [
      { id: 1, title: 'Mobile App Developer', type: 'Full-time', location: 'Hyderabad' },
      { id: 2, title: 'Content Creator', type: 'Part-time', location: 'Remote' }
    ]
  }
];

export function StartupHub({ userRole }: StartupHubProps) {
  const [selectedStartup, setSelectedStartup] = useState<typeof startups[0] | null>(null);
  const [activeTab, setActiveTab] = useState('discover');

  // Startup Detail View
  if (selectedStartup) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-4"
              onClick={() => setSelectedStartup(null)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Startups
            </Button>

            <div className="space-y-6">
              {/* Startup Header */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold mb-2">{selectedStartup.name}</h1>
                  <p className="text-muted-foreground mb-3">{selectedStartup.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{selectedStartup.stage}</Badge>
                    <Badge variant="outline">{selectedStartup.sector}</Badge>
                    {selectedStartup.hiring && <Badge>Hiring</Badge>}
                    {selectedStartup.fundraising && <Badge variant="outline">Fundraising</Badge>}
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <Users className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Team Size</p>
                  <p className="text-xl font-semibold">{selectedStartup.employees}</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Founded</p>
                  <p className="text-xl font-semibold">{selectedStartup.founded}</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Funding</p>
                  <p className="text-xl font-semibold">{selectedStartup.funding}</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-xl font-semibold">{selectedStartup.employees}</p>
                </div>
              </div>

              {/* About */}
              <div>
                <h3 className="font-medium mb-2">About {selectedStartup.name}</h3>
                <p className="text-muted-foreground">{selectedStartup.fullDescription}</p>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="font-medium mb-3">Connect with Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Founder</p>
                      <p className="font-medium">{selectedStartup.founder}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{selectedStartup.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Globe className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <a href={selectedStartup.website} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                        {selectedStartup.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Open Positions */}
              {selectedStartup.openPositions.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">Open Positions ({selectedStartup.openPositions.length})</h3>
                  <div className="space-y-3">
                    {selectedStartup.openPositions.map((position) => (
                      <Card key={position.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium mb-1">{position.title}</h4>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Briefcase className="w-4 h-4" />
                                  {position.type}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {position.location}
                                </span>
                              </div>
                            </div>
                            <Button size="sm">Apply</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Fundraising Info */}
              {selectedStartup.fundraising && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <DollarSign className="w-8 h-8 text-primary mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">Fundraising Active</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Currently raising {selectedStartup.fundraisingGoal} • Already raised {selectedStartup.funding}
                        </p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>Express Interest</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Investment Interest</DialogTitle>
                              <DialogDescription>
                                Express your interest in investing in {selectedStartup.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="name">Your Name</Label>
                                <Input id="name" placeholder="John Doe" />
                              </div>
                              <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john@example.com" />
                              </div>
                              <div>
                                <Label htmlFor="investment">Investment Amount Interest</Label>
                                <Input id="investment" placeholder="e.g., $100K - $500K" />
                              </div>
                              <div>
                                <Label htmlFor="message">Message to Founder</Label>
                                <Textarea 
                                  id="message" 
                                  placeholder="Tell the founder about your background and interest..."
                                  rows={3}
                                />
                              </div>
                              <Button className="w-full">Submit Interest</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" asChild>
                  <a href={selectedStartup.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Founder
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact {selectedStartup.founder}</DialogTitle>
                      <DialogDescription>
                        Send a message to the founder
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="Partnership opportunity" />
                      </div>
                      <div>
                        <Label htmlFor="contact-message">Message</Label>
                        <Textarea 
                          id="contact-message" 
                          placeholder="Your message..."
                          rows={4}
                        />
                      </div>
                      <Button className="w-full">Send Message</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Hub View
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Startup Hub</CardTitle>
              <CardDescription>Connect with alumni-founded startups for opportunities and investment</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Rocket className="w-4 h-4 mr-2" />
                  Add Your Startup
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Your Startup</DialogTitle>
                  <DialogDescription>
                    Share your startup with the BITS alumni network
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="startup-name">Startup Name</Label>
                    <Input id="startup-name" placeholder="Your Startup" />
                  </div>
                  <div>
                    <Label htmlFor="sector">Sector</Label>
                    <Input id="sector" placeholder="e.g., FinTech, EdTech, HealthTech" />
                  </div>
                  <div>
                    <Label htmlFor="stage">Funding Stage</Label>
                    <Input id="stage" placeholder="e.g., Seed, Series A" />
                  </div>
                  <div>
                    <Label htmlFor="startup-description">Description</Label>
                    <Textarea 
                      id="startup-description" 
                      placeholder="What does your startup do?"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="hiring-check" className="rounded" />
                    <Label htmlFor="hiring-check" className="font-normal cursor-pointer">
                      We're hiring
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="fundraising-check" className="rounded" />
                    <Label htmlFor="fundraising-check" className="font-normal cursor-pointer">
                      We're fundraising
                    </Label>
                  </div>
                  <Button className="w-full">Submit for Review</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover Startups</TabsTrigger>
          <TabsTrigger value="hiring">Hiring</TabsTrigger>
          <TabsTrigger value="investors">For Investors</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-4 mt-6">
          {startups.map((startup) => (
            <Card key={startup.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedStartup(startup)}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-medium">{startup.name}</h3>
                      <Badge variant="secondary">{startup.stage}</Badge>
                      {startup.hiring && <Badge>Hiring</Badge>}
                      {startup.fundraising && <Badge variant="outline">Fundraising</Badge>}
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {startup.description}
                    </p>

                    <p className="text-xs text-muted-foreground mb-3">
                      Founded by {startup.founder} • {startup.sector}
                    </p>

                    <div className="flex gap-2">
                      <Button size="sm" onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStartup(startup);
                      }}>
                        View Details
                      </Button>
                      {startup.hiring && startup.openPositions.length > 0 && (
                        <Button size="sm" variant="outline">
                          {startup.openPositions.length} Openings
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="hiring" className="mt-6">
          <div className="space-y-4">
            {startups.filter(s => s.hiring && s.openPositions.length > 0).map((startup) => (
              <Card key={startup.id}>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{startup.name}</h3>
                      <Badge variant="secondary">{startup.sector}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{startup.description}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{startup.openPositions.length} Open Positions:</p>
                    {startup.openPositions.map((position) => (
                      <div key={position.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{position.title}</p>
                          <p className="text-xs text-muted-foreground">{position.location}</p>
                        </div>
                        <Button size="sm" onClick={() => setSelectedStartup(startup)}>View</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="investors" className="mt-6">
          <div className="space-y-4">
            {startups.filter(s => s.fundraising).map((startup) => (
              <Card key={startup.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedStartup(startup)}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{startup.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{startup.description}</p>
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary">{startup.stage}</Badge>
                        <Badge variant="outline">{startup.sector}</Badge>
                        <span className="text-sm text-muted-foreground">
                          Raised: {startup.funding}
                        </span>
                      </div>
                      <Button size="sm" onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStartup(startup);
                      }}>
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
