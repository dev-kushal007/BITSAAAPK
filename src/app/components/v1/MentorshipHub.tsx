import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Search, GraduationCap, Award, Calendar, MessageSquare } from 'lucide-react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface MentorshipHubProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

const mockMentors = [
  {
    id: 1,
    name: 'Dr. Anita Sharma',
    role: 'VP of Engineering',
    company: 'Google',
    expertise: ['Leadership', 'Career Growth', 'Tech Management'],
    availability: 'Available',
    sessions: 45,
    rating: 4.9
  },
  {
    id: 2,
    name: 'Rajesh Patel',
    role: 'Founder & CEO',
    company: 'TechStart Inc',
    expertise: ['Entrepreneurship', 'Fundraising', 'Product Strategy'],
    availability: 'Limited',
    sessions: 32,
    rating: 4.8
  },
  {
    id: 3,
    name: 'Priya Menon',
    role: 'Senior Product Manager',
    company: 'Microsoft',
    expertise: ['Product Management', 'B2B SaaS', 'Agile'],
    availability: 'Available',
    sessions: 28,
    rating: 4.9
  }
];

export function MentorshipHub({ userRole }: MentorshipHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('find-mentor');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mentorship Hub</CardTitle>
          <CardDescription>Connect with experienced alumni for guidance and career support</CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="find-mentor">Find a Mentor</TabsTrigger>
          <TabsTrigger value="become-mentor">Become a Mentor</TabsTrigger>
          <TabsTrigger value="my-sessions">My Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="find-mentor" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, expertise, or company..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockMentors.map((mentor) => (
              <Card key={mentor.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-medium">
                      {mentor.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground">{mentor.role}</p>
                      <p className="text-sm text-muted-foreground">{mentor.company}</p>
                    </div>
                    <Badge variant={mentor.availability === 'Available' ? 'default' : 'secondary'}>
                      {mentor.availability}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Areas of Expertise:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {mentor.expertise.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{mentor.sessions} sessions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{mentor.rating} rating</span>
                      </div>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Request Mentorship</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Request Mentorship from {mentor.name}</DialogTitle>
                        <DialogDescription>
                          Tell us about your goals and what you hope to achieve from this mentorship
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="goal">What are your mentorship goals?</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a goal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="career-growth">Career Growth</SelectItem>
                              <SelectItem value="job-switch">Job Switch</SelectItem>
                              <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                              <SelectItem value="skill-development">Skill Development</SelectItem>
                              <SelectItem value="leadership">Leadership Development</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="message">Tell us more about your goals</Label>
                          <Textarea
                            id="message"
                            placeholder="Share your background, current situation, and what you hope to achieve..."
                            rows={4}
                          />
                        </div>

                        <div>
                          <Label htmlFor="duration">Preferred Duration</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6-weeks">6 weeks</SelectItem>
                              <SelectItem value="3-months">3 months</SelectItem>
                              <SelectItem value="6-months">6 months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button className="w-full">Send Request</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="become-mentor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Become a Mentor</CardTitle>
              <CardDescription>Share your experience and help fellow alumni grow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <GraduationCap className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-medium mb-1">Guide Alumni</h4>
                  <p className="text-sm text-muted-foreground">
                    Help early-career alumni navigate their professional journey
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Award className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-medium mb-1">Earn Recognition</h4>
                  <p className="text-sm text-muted-foreground">
                    Get featured as a top mentor and build your reputation
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div>
                  <Label>Areas of Expertise</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Select the areas where you can provide mentorship
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Career Growth', 'Leadership', 'Product Management', 'Engineering', 'Entrepreneurship', 'Finance'].map((area) => (
                      <Badge key={area} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="availability">Your Availability</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 hours per week</SelectItem>
                      <SelectItem value="2-4">2-4 hours per week</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Register as Mentor</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-sessions">
          <Card>
            <CardHeader>
              <CardTitle>My Mentorship Sessions</CardTitle>
              <CardDescription>Track your ongoing and past mentorship sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium mb-1">No active sessions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Request mentorship or become a mentor to get started
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
