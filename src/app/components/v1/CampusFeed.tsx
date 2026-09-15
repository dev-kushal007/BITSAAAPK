import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { GraduationCap, Trophy, Beaker, Users as UsersIcon, ExternalLink, ArrowLeft, ThumbsUp, MessageSquare, Share2, Send } from 'lucide-react';
import { Textarea } from '../ui/textarea';

interface CampusFeedProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

const mockUpdates = [
  {
    id: 1,
    type: 'fest',
    title: 'Oasis 2024 - Dates Announced!',
    campus: 'Pilani',
    date: 'Nov 15, 2024',
    description: 'The annual cultural fest Oasis will be held from October 20-23, 2024. Registrations open soon!',
    fullContent: 'Oasis, BITS Pilani\'s flagship cultural festival, is back with its 2024 edition! This year promises to be bigger and better with renowned artists, cultural competitions, and workshops. The fest will feature professional shows, informal events, and exciting competitions across various categories including music, dance, drama, fine arts, and literary events.\n\nExpected footfall: 50,000+ students from across India\nProshows lineup to be announced soon!\n\nAlumni are welcome to participate and mentor students. Special alumni passes available.',
    icon: Trophy,
    author: 'BITS Pilani Official',
    likes: 234,
    comments: 45,
    link: 'https://bits-oasis.org'
  },
  {
    id: 2,
    type: 'achievement',
    title: 'BITS Team Wins Smart India Hackathon',
    campus: 'Goa',
    date: 'Nov 10, 2024',
    description: 'Team from BITS Goa secured first place in the national hackathon with their innovative healthcare solution.',
    fullContent: 'A team of final-year students from BITS Pilani, Goa Campus has won the Grand Finale of Smart India Hackathon 2024! Their project "HealthConnect" - an AI-powered platform for rural healthcare management impressed the jury with its innovation and social impact.\n\nThe solution uses machine learning to predict disease outbreaks in rural areas and connects patients with doctors through a mobile app. The team received a cash prize of ₹1,00,000 and mentorship opportunities with leading healthcare startups.\n\nTeam Members:\n- Arjun Malhotra (Computer Science)\n- Neha Kapoor (Electronics)\n- Vikram Singh (Pharmacy)\n- Divya Sharma (Biotechnology)',
    icon: Trophy,
    author: 'BITS Goa Campus',
    likes: 456,
    comments: 78,
    link: 'https://www.sih.gov.in/'
  },
  {
    id: 3,
    type: 'research',
    title: 'New AI Research Lab Inaugurated',
    campus: 'Hyderabad',
    date: 'Nov 5, 2024',
    description: 'State-of-the-art AI and Machine Learning research lab opens at BITS Hyderabad campus.',
    fullContent: 'BITS Pilani, Hyderabad Campus has inaugurated a cutting-edge Artificial Intelligence and Machine Learning Research Lab with funding from the Ministry of Education. The lab is equipped with high-performance GPU clusters, advanced robotics equipment, and IoT infrastructure.\n\nThe lab will focus on research in:\n- Computer Vision and Image Processing\n- Natural Language Processing\n- Reinforcement Learning\n- Edge AI and IoT\n- Robotics and Automation\n\nThe facility will support both faculty research and student projects, with dedicated spaces for collaborative work. Industry partnerships with leading tech companies are already in place for sponsored research projects.',
    icon: Beaker,
    author: 'BITS Hyderabad Campus',
    likes: 312,
    comments: 34,
    link: 'https://www.bits-pilani.ac.in/hyderabad/'
  },
  {
    id: 4,
    type: 'fest',
    title: 'APOGEE 2024 Preparations Underway',
    campus: 'Pilani',
    date: 'Nov 1, 2024',
    description: 'The technical fest APOGEE is scheduled for March 2024. Registration details coming soon.',
    fullContent: 'APOGEE 2024, BITS Pilani\'s annual technical extravaganza, is gearing up for an exciting edition! The fest will feature robotics competitions, coding challenges, workshops by industry experts, and keynote sessions from leading technologists.\n\nHighlights:\n- International Robotics Championship\n- 48-hour Hackathon with ₹5 lakh prize pool\n- Workshops on AI, Blockchain, and Web3\n- Startup pitch competition\n- Tech exhibitions and demonstrations\n\nAlumni mentorship program: Experienced alumni can sign up to mentor student teams in various competitions. This is a great opportunity to give back and stay connected with campus.',
    icon: GraduationCap,
    author: 'BITS Pilani Official',
    likes: 189,
    comments: 23,
    link: 'https://bits-apogee.org'
  },
  {
    id: 5,
    type: 'achievement',
    title: 'Professor Receives Prestigious Research Award',
    campus: 'Pilani',
    date: 'Oct 28, 2024',
    description: 'Dr. Rajesh Kumar from the Physics department awarded the Shanti Swarup Bhatnagar Prize.',
    fullContent: 'Dr. Rajesh Kumar, Professor in the Department of Physics at BITS Pilani, has been awarded the prestigious Shanti Swarup Bhatnagar Prize for Science and Technology 2024 for his groundbreaking work in Quantum Computing.\n\nDr. Kumar\'s research focuses on developing efficient quantum algorithms and has published over 100 papers in leading international journals. His work has significant implications for cryptography, optimization problems, and drug discovery.\n\nThe award comes with a citation, a cash prize, and research funding. Dr. Kumar is the third BITS faculty member to receive this honor, further cementing BITS Pilani\'s position as a leading research institution.',
    icon: Trophy,
    author: 'BITS Pilani Official',
    likes: 523,
    comments: 67,
    link: 'https://www.bits-pilani.ac.in/'
  }
];

const mockComments = [
  { id: 1, author: 'Rahul Sharma', role: 'Batch 2015', comment: 'This is amazing! So proud of the team!', time: '2 hours ago' },
  { id: 2, author: 'Priya Menon', role: 'Batch 2012', comment: 'Congratulations! Would love to mentor for future projects.', time: '3 hours ago' },
  { id: 3, author: 'Amit Patel', role: 'Batch 2018', comment: 'Great initiative! This will help so many students.', time: '5 hours ago' }
];

export function CampusFeed({ userRole }: CampusFeedProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedUpdate, setSelectedUpdate] = useState<typeof mockUpdates[0] | null>(null);

  const filteredUpdates = mockUpdates.filter(update => {
    if (activeTab === 'all') return true;
    if (activeTab === 'fests') return update.type === 'fest';
    if (activeTab === 'research') return update.type === 'research';
    if (activeTab === 'achievements') return update.type === 'achievement';
    return true;
  });

  // Update Detail View
  if (selectedUpdate) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-4"
              onClick={() => setSelectedUpdate(null)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Feed
            </Button>

            <div className="space-y-6">
              {/* Update Header */}
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {React.createElement(selectedUpdate.icon, { className: "w-8 h-8 text-primary" })}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold mb-2">{selectedUpdate.title}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{selectedUpdate.campus}</Badge>
                    <span className="text-sm text-muted-foreground">{selectedUpdate.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Posted by {selectedUpdate.author}</p>
                </div>
              </div>

              {/* Full Content */}
              <div>
                <p className="text-muted-foreground whitespace-pre-line">{selectedUpdate.fullContent}</p>
              </div>

              {/* Link */}
              {selectedUpdate.link && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={selectedUpdate.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Official Website
                  </a>
                </Button>
              )}

              {/* Engagement Stats */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  {selectedUpdate.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {selectedUpdate.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Comments Section */}
              <div>
                <h3 className="font-medium mb-4">Comments ({mockComments.length})</h3>
                
                {/* Add Comment */}
                <div className="flex gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium">Y</span>
                  </div>
                  <div className="flex-1">
                    <Textarea 
                      placeholder="Write a comment..."
                      rows={2}
                      className="mb-2"
                    />
                    <Button size="sm">
                      <Send className="w-4 h-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 p-4 bg-secondary/50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium">{comment.author.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <h4 className="font-medium text-sm">{comment.author}</h4>
                          <span className="text-xs text-muted-foreground">{comment.role}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{comment.comment}</p>
                        <span className="text-xs text-muted-foreground">{comment.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Feed View
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campus Connect</CardTitle>
          <CardDescription>Stay updated with news and achievements from BITS campuses</CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Updates</TabsTrigger>
          <TabsTrigger value="fests">Fests</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {filteredUpdates.map((update) => {
            const Icon = update.icon;
            return (
              <Card key={update.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedUpdate(update)}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-medium">{update.title}</h3>
                        <Badge variant="secondary">{update.campus}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{update.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{update.date}</span>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {update.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              {update.comments}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUpdate(update);
                        }}>
                          Read More
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredUpdates.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium mb-1">No updates yet</h3>
                <p className="text-sm text-muted-foreground">
                  Check back later for updates
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
