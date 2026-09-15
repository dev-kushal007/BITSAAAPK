import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { MapPin, Calendar, Users, Clock, ArrowLeft, Plus, MapPinned, Phone, Mail, Globe } from 'lucide-react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface ChaptersEventsProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

const mockChapters = [
  { 
    id: 1, 
    name: 'Bengaluru Chapter', 
    members: 1250, 
    upcomingEvents: 3,
    description: 'The largest BITSAA chapter in India, bringing together alumni from the tech capital.',
    leader: 'Rahul Sharma',
    email: 'bengaluru@bitsaa.org',
    phone: '+91 98765 43210',
    location: 'Bengaluru, Karnataka, India'
  },
  { 
    id: 2, 
    name: 'Mumbai Chapter', 
    members: 980, 
    upcomingEvents: 2,
    description: 'Connecting alumni in the financial capital with networking and professional events.',
    leader: 'Sneha Reddy',
    email: 'mumbai@bitsaa.org',
    phone: '+91 98765 43211',
    location: 'Mumbai, Maharashtra, India'
  },
  { 
    id: 3, 
    name: 'Silicon Valley Chapter', 
    members: 650, 
    upcomingEvents: 4,
    description: 'Fostering innovation and entrepreneurship among alumni in the heart of tech.',
    leader: 'Priya Menon',
    email: 'siliconvalley@bitsaa.org',
    phone: '+1 650 555 0123',
    location: 'San Francisco Bay Area, USA'
  },
  { 
    id: 4, 
    name: 'Singapore Chapter', 
    members: 420, 
    upcomingEvents: 1,
    description: 'Building a strong professional network among BITS alumni in Southeast Asia.',
    leader: 'Karthik Iyer',
    email: 'singapore@bitsaa.org',
    phone: '+65 9123 4567',
    location: 'Singapore'
  }
];

const mockEvents = [
  {
    id: 1,
    title: 'Annual Alumni Meetup 2024',
    chapter: 'Bengaluru Chapter',
    date: 'Dec 15, 2024',
    time: '6:00 PM - 9:00 PM',
    location: 'The Leela Palace, Bengaluru',
    attendees: 125,
    status: 'upcoming',
    description: 'Join us for our annual reunion! Network with fellow BITSians, enjoy dinner, and celebrate our achievements. Special guest speaker from the Class of 2005.',
    agenda: ['6:00 PM - Registration & Networking', '7:00 PM - Welcome Address', '7:30 PM - Keynote Speech', '8:00 PM - Dinner & Social'],
    organizer: 'Rahul Sharma'
  },
  {
    id: 2,
    title: 'Tech Talk: AI & Future of Work',
    chapter: 'Silicon Valley Chapter',
    date: 'Dec 10, 2024',
    time: '7:00 PM - 8:30 PM',
    location: 'Google Campus, Mountain View',
    attendees: 85,
    status: 'upcoming',
    description: 'An insightful session on how AI is transforming the workplace. Panel discussion with BITS alumni working at leading AI companies.',
    agenda: ['7:00 PM - Networking', '7:15 PM - Panel Discussion', '8:00 PM - Q&A', '8:15 PM - Closing Remarks'],
    organizer: 'Priya Menon'
  },
  {
    id: 3,
    title: 'Career Mentorship Workshop',
    chapter: 'Mumbai Chapter',
    date: 'Dec 20, 2024',
    time: '10:00 AM - 1:00 PM',
    location: 'WeWork, BKC',
    attendees: 42,
    status: 'upcoming',
    description: 'Interactive workshop on career transitions and growth strategies. Learn from experienced mentors.',
    agenda: ['10:00 AM - Introduction', '10:30 AM - Breakout Sessions', '12:00 PM - Networking Lunch'],
    organizer: 'Sneha Reddy'
  }
];

export function ChaptersEvents({ userRole }: ChaptersEventsProps) {
  const [activeTab, setActiveTab] = useState('events');
  const [selectedEvent, setSelectedEvent] = useState<typeof mockEvents[0] | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<typeof mockChapters[0] | null>(null);
  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);

  // Event Detail View
  if (selectedEvent) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-4"
              onClick={() => setSelectedEvent(null)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>

            <div className="space-y-6">
              {/* Event Header */}
              <div>
                <h1 className="text-2xl font-semibold mb-2">{selectedEvent.title}</h1>
                <Badge variant="secondary">{selectedEvent.chapter}</Badge>
              </div>

              {/* Event Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-muted-foreground">{selectedEvent.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-muted-foreground">{selectedEvent.time}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{selectedEvent.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Users className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Attendees</p>
                      <p className="text-muted-foreground">{selectedEvent.attendees} registered</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-medium mb-2">About This Event</h3>
                <p className="text-muted-foreground">{selectedEvent.description}</p>
              </div>

              {/* Agenda */}
              <div>
                <h3 className="font-medium mb-2">Agenda</h3>
                <ul className="space-y-2">
                  {selectedEvent.agenda.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Organizer */}
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground">Organized by</p>
                <p className="font-medium">{selectedEvent.organizer}</p>
                <p className="text-sm text-muted-foreground">{selectedEvent.chapter}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button className="flex-1">Register for Event</Button>
                <Button variant="outline" className="flex-1">Share Event</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Chapter Detail View
  if (selectedChapter) {
    const chapterEvents = mockEvents.filter(e => e.chapter === selectedChapter.name);
    
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-4"
              onClick={() => setSelectedChapter(null)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chapters
            </Button>

            <div className="space-y-6">
              {/* Chapter Header */}
              <div>
                <h1 className="text-2xl font-semibold mb-2">{selectedChapter.name}</h1>
                <p className="text-muted-foreground">{selectedChapter.description}</p>
              </div>

              {/* Chapter Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Users className="w-8 h-8 text-primary mb-2" />
                  <p className="text-2xl font-semibold">{selectedChapter.members.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Calendar className="w-8 h-8 text-primary mb-2" />
                  <p className="text-2xl font-semibold">{selectedChapter.upcomingEvents}</p>
                  <p className="text-sm text-muted-foreground">Upcoming Events</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <MapPinned className="w-8 h-8 text-primary mb-2" />
                  <p className="text-2xl font-semibold">24+</p>
                  <p className="text-sm text-muted-foreground">Events This Year</p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="font-medium mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Users className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Chapter Leader</p>
                      <p className="font-medium">{selectedChapter.leader}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{selectedChapter.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedChapter.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Phone className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedChapter.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chapter Events */}
              <div>
                <h3 className="font-medium mb-3">Upcoming Events</h3>
                <div className="space-y-3">
                  {chapterEvents.map((event) => (
                    <Card key={event.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedEvent(event)}>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{event.title}</h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {chapterEvents.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">No upcoming events</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <Button className="w-full">Join Chapter</Button>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Chapters & Events</CardTitle>
              <CardDescription>Connect with local alumni and attend events in your city</CardDescription>
            </div>
            {(userRole === 'chapter-leader' || userRole === 'admin') && (
              <Dialog open={showCreateEventDialog} onOpenChange={setShowCreateEventDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                    <DialogDescription>
                      Organize an event for your chapter
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="event-title">Event Title</Label>
                      <Input id="event-title" placeholder="e.g., Annual Alumni Meetup" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" placeholder="e.g., 6:00 PM - 9:00 PM" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Event venue" />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe your event..."
                        rows={4}
                      />
                    </div>
                    <Button className="w-full" onClick={() => setShowCreateEventDialog(false)}>
                      Create Event
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4 mt-6">
          {mockEvents.map((event) => (
            <Card key={event.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedEvent(event)}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">{event.title}</h3>
                    <Badge variant="secondary" className="mb-3">{event.chapter}</Badge>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button className="w-full md:w-auto" onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}>
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="chapters" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockChapters.map((chapter) => (
              <Card key={chapter.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedChapter(chapter)}>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">{chapter.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{chapter.description}</p>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{chapter.members.toLocaleString()} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{chapter.upcomingEvents} upcoming events</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" onClick={(e) => {
                    e.stopPropagation();
                    setSelectedChapter(chapter);
                  }}>
                    View Chapter
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
