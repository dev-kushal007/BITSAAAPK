import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sparkles, TrendingUp, Users, MessageSquare } from 'lucide-react';

interface AINetworkingProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

const suggestions = [
  {
    id: 1,
    name: 'Sarah Johnson',
    reason: 'Works in AI/ML at Google, shares 3 common interests',
    score: 95,
    mutualConnections: 5
  },
  {
    id: 2,
    name: 'Vikram Patel',
    reason: 'Product Manager at Microsoft, similar career path',
    score: 88,
    mutualConnections: 3
  },
  {
    id: 3,
    name: 'Lisa Chen',
    reason: 'Recently relocated to Bengaluru, seeking connections',
    score: 82,
    mutualConnections: 2
  }
];

export function AINetworking({ userRole }: AINetworkingProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <CardTitle>AI-Powered Networking</CardTitle>
          </div>
          <CardDescription>
            Intelligent connection recommendations based on your profile, interests, and career goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-background rounded-lg">
              <TrendingUp className="w-8 h-8 text-primary mb-2" />
              <h4 className="font-medium mb-1">Smart Matching</h4>
              <p className="text-sm text-muted-foreground">
                AI analyzes profiles to find your best matches
              </p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <MessageSquare className="w-8 h-8 text-primary mb-2" />
              <h4 className="font-medium mb-1">Conversation Starters</h4>
              <p className="text-sm text-muted-foreground">
                Get AI-generated icebreakers for each connection
              </p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <Users className="w-8 h-8 text-primary mb-2" />
              <h4 className="font-medium mb-1">Network Insights</h4>
              <p className="text-sm text-muted-foreground">
                Understand patterns in your growing network
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="font-medium mb-4">Recommended Connections</h3>
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-medium flex-shrink-0">
                    {suggestion.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{suggestion.name}</h3>
                      <Badge variant="secondary" className="gap-1">
                        <Sparkles className="w-3 h-3" />
                        {suggestion.score}% match
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{suggestion.reason}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Users className="w-4 h-4" />
                      <span>{suggestion.mutualConnections} mutual connections</span>
                    </div>

                    <div className="bg-muted p-3 rounded-lg mb-3">
                      <p className="text-sm font-medium mb-1">💡 AI Suggested Icebreaker:</p>
                      <p className="text-sm text-muted-foreground">
                        "Hi {suggestion.name.split(' ')[0]}, I noticed we both have a passion for AI/ML and similar career trajectories. Would love to connect and exchange experiences!"
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button>Connect</Button>
                      <Button variant="outline">View Profile</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}