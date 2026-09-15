import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Bot, TrendingUp, FileText, Video } from 'lucide-react';

interface AICareerCoachProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

export function AICareerCoach({ userRole }: AICareerCoachProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-6 h-6 text-primary" />
            <CardTitle>AI Career Coach</CardTitle>
          </div>
          <CardDescription>
            Get personalized career guidance powered by AI and alumni insights
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <FileText className="w-8 h-8 text-primary mb-3" />
            <h4 className="font-medium mb-2">Resume Analysis</h4>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered resume review with suggestions for improvement
            </p>
            <Button className="w-full">Upload Resume</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <TrendingUp className="w-8 h-8 text-primary mb-3" />
            <h4 className="font-medium mb-2">Career Path Recommendations</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Personalized role suggestions based on your profile
            </p>
            <Button className="w-full">Get Recommendations</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Video className="w-8 h-8 text-primary mb-3" />
            <h4 className="font-medium mb-2">Mock Interview Practice</h4>
            <p className="text-sm text-muted-foreground mb-4">
              AI-driven interview practice with real-time feedback
            </p>
            <Button className="w-full">Start Practice</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Bot className="w-8 h-8 text-primary mb-3" />
            <h4 className="font-medium mb-2">Skills Gap Analysis</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Identify skills to learn for your dream role
            </p>
            <Button className="w-full">Analyze Skills</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}