import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Search, Users, Plus, TrendingUp, MessageSquare, ArrowLeft, Send, ThumbsUp, Share2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface InterestGroupsProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

const mockGroups = [
  {
    id: 1,
    name: 'AI & Machine Learning',
    category: 'Technology',
    members: 1247,
    posts: 89,
    description: 'Discuss latest trends in AI, ML, and Deep Learning',
    isJoined: true,
    trending: true
  },
  {
    id: 2,
    name: 'Product Management',
    category: 'Career',
    members: 856,
    posts: 124,
    description: 'For PMs and aspiring PMs to share experiences and learn',
    isJoined: true,
    trending: false
  },
  {
    id: 3,
    name: 'Finance & Investment Banking',
    category: 'Career',
    members: 643,
    posts: 67,
    description: 'Connect with alumni in finance, banking, and investments',
    isJoined: false,
    trending: true
  },
  {
    id: 4,
    name: 'Entrepreneurship & Startups',
    category: 'Business',
    members: 982,
    posts: 156,
    description: 'For founders, aspiring entrepreneurs, and startup enthusiasts',
    isJoined: true,
    trending: true
  },
  {
    id: 5,
    name: 'Photography',
    category: 'Hobby',
    members: 421,
    posts: 203,
    description: 'Share your photography work and learn from others',
    isJoined: false,
    trending: false
  },
  {
    id: 6,
    name: 'Sports & Fitness',
    category: 'Lifestyle',
    members: 734,
    posts: 98,
    description: 'Stay fit, share fitness tips, and organize sports events',
    isJoined: false,
    trending: false
  }
];

const mockGroupPosts = [
  {
    id: 1,
    author: 'Rahul Sharma',
    role: 'ML Engineer at Google',
    time: '2 hours ago',
    content: 'Just published a blog post on implementing transformers from scratch. Would love to hear your thoughts!',
    likes: 24,
    comments: 8
  },
  {
    id: 2,
    author: 'Priya Menon',
    role: 'Senior PM at Microsoft',
    time: '5 hours ago',
    content: 'Looking for recommendations on AI/ML courses for non-technical PMs. Any suggestions?',
    likes: 15,
    comments: 12
  },
  {
    id: 3,
    author: 'Amit Patel',
    role: 'Data Scientist at Tesla',
    time: '1 day ago',
    content: 'Excited to share that our team\'s research paper on autonomous driving was accepted at NeurIPS 2025!',
    likes: 42,
    comments: 18
  }
];

export function InterestGroups({ userRole }: InterestGroupsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState<typeof mockGroups[0] | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' ||
                      (activeTab === 'my-groups' && group.isJoined) ||
                      (activeTab === 'trending' && group.trending);
    return matchesSearch && matchesTab;
  });

  // Group Detail View
  if (selectedGroup) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardContent className="p-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-4"
              onClick={() => setSelectedGroup(null)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Groups
            </Button>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-2xl font-semibold mb-1">{selectedGroup.name}</h1>
                    <Badge variant="outline">{selectedGroup.category}</Badge>
                  </div>
                  {selectedGroup.isJoined ? (
                    <Button variant="outline">Leave Group</Button>
                  ) : (
                    <Button>Join Group</Button>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">{selectedGroup.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{selectedGroup.members.toLocaleString()} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{selectedGroup.posts} posts</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Create Post */}
        {selectedGroup.isJoined && (
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium">Y</span>
                </div>
                <div className="flex-1">
                  <Textarea 
                    placeholder="Share something with the group..."
                    rows={3}
                    className="mb-3"
                  />
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts Feed */}
        <div className="space-y-4">
          {mockGroupPosts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium">{post.author.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium">{post.author}</h4>
                    <p className="text-sm text-muted-foreground">{post.role}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </div>

                <p className="text-foreground mb-4">{post.content}</p>

                <div className="flex items-center gap-4 pt-3 border-t">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Groups List View
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Interest Groups</CardTitle>
              <CardDescription>Connect with alumni who share your interests</CardDescription>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Group
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Group</DialogTitle>
                  <DialogDescription>
                    Start a new interest group to connect with like-minded alumni
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="group-name">Group Name</Label>
                    <Input id="group-name" placeholder="e.g., Blockchain Enthusiasts" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="career">Career</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="hobby">Hobby</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe what your group is about..."
                      rows={3}
                    />
                  </div>
                  <Button className="w-full" onClick={() => setShowCreateDialog(false)}>
                    Create Group
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search groups..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Groups</TabsTrigger>
          <TabsTrigger value="my-groups">My Groups</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    {group.trending && (
                      <Badge variant="secondary" className="gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-medium mb-1">{group.name}</h3>
                  <Badge variant="outline" className="text-xs mb-3">{group.category}</Badge>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {group.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{group.members.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{group.posts}</span>
                    </div>
                  </div>

                  {group.isJoined ? (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedGroup(group)}
                    >
                      View Group
                    </Button>
                  ) : (
                    <Button className="w-full">Join Group</Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium mb-1">No groups found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}