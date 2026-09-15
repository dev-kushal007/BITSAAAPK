import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Heart, Award, GraduationCap, TrendingUp } from 'lucide-react';

interface DonationsGivingProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

const campaigns = [
  {
    id: 1,
    title: 'Student Scholarship Fund 2024',
    description: 'Support underprivileged students to pursue their dreams at BITS',
    raised: 2500000,
    goal: 5000000,
    donors: 145,
    daysLeft: 45
  },
  {
    id: 2,
    title: 'Research Lab Infrastructure',
    description: 'Upgrade AI and ML research facilities across all campuses',
    raised: 1800000,
    goal: 3000000,
    donors: 89,
    daysLeft: 60
  },
  {
    id: 3,
    title: 'Campus Development Fund',
    description: 'General campus improvement and student welfare initiatives',
    raised: 3200000,
    goal: 4000000,
    donors: 210,
    daysLeft: 30
  }
];

export function DonationsGiving({ userRole }: DonationsGivingProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Giving & Philanthropy</CardTitle>
          <CardDescription>Give back to BITS and support the next generation of innovators</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-medium mb-1">Total Donations</h4>
            <p className="text-2xl font-semibold text-primary">₹7.5 Cr</p>
            <p className="text-xs text-muted-foreground mt-1">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Award className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-medium mb-1">Active Donors</h4>
            <p className="text-2xl font-semibold text-primary">444</p>
            <p className="text-xs text-muted-foreground mt-1">Alumni contributors</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <GraduationCap className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-medium mb-1">Students Supported</h4>
            <p className="text-2xl font-semibold text-primary">156</p>
            <p className="text-xs text-muted-foreground mt-1">Scholarships awarded</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="font-medium mb-4">Active Campaigns</h3>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">{campaign.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{campaign.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          ₹{(campaign.raised / 100000).toFixed(1)}L raised
                        </span>
                        <span className="font-medium">
                          ₹{(campaign.goal / 100000).toFixed(1)}L goal
                        </span>
                      </div>
                      <Progress value={(campaign.raised / campaign.goal) * 100} />
                    </div>

                    <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                      <span>{campaign.donors} donors</span>
                      <span>•</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:w-auto w-full">
                    <Button className="w-full md:w-auto">
                      <Heart className="w-4 h-4 mr-2" />
                      Donate Now
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto">Learn More</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1">Become a Donor</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Your contribution makes a lasting impact on students and the institution
              </p>
              <ul className="space-y-1.5 text-sm mb-4">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <span>Get exclusive donor badge on your profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <span>Receive regular impact reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <span>Join the donor recognition program</span>
                </li>
              </ul>
              <Button>Start Giving</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
