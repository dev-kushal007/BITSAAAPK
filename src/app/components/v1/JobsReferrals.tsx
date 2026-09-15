import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Search, Briefcase, MapPin, Clock, ExternalLink, Users, ArrowLeft, DollarSign, Building } from 'lucide-react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface JobsReferralsProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

const mockJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'Bengaluru, India',
    type: 'Full-time',
    posted: '2 days ago',
    referralsAvailable: 3,
    postedBy: 'Rahul Sharma',
    description: 'We are looking for a Senior Software Engineer to join our Cloud Infrastructure team. You will be responsible for designing and building scalable distributed systems that power Google Cloud.',
    requirements: ['5+ years of experience in software development', 'Strong knowledge of distributed systems', 'Experience with Go, Java, or C++', 'Bachelor\'s degree in Computer Science or equivalent'],
    salary: '$150k - $200k',
    benefits: ['Health Insurance', 'Stock Options', 'Flexible WFH', '401k Matching']
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Microsoft',
    location: 'Seattle, USA',
    type: 'Full-time',
    posted: '5 days ago',
    referralsAvailable: 2,
    postedBy: 'Priya Menon',
    description: 'Join the Azure team as a Product Manager to drive product strategy and execution for cloud computing solutions.',
    requirements: ['3+ years of PM experience', 'Strong technical background', 'Experience with B2B SaaS products', 'MBA preferred'],
    salary: '$130k - $180k',
    benefits: ['Health Insurance', 'Stock Options', 'Remote Work', 'Relocation Assistance']
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'Amazon',
    location: 'Remote',
    type: 'Full-time',
    posted: '1 week ago',
    referralsAvailable: 1,
    postedBy: 'Ananya Singh',
    description: 'Work on cutting-edge ML models to improve customer experience and drive business impact at Amazon scale.',
    requirements: ['PhD or MS in Statistics, CS, or related field', 'Experience with Python, R, and SQL', 'Strong statistical modeling skills', 'Experience with large-scale data processing'],
    salary: '$140k - $190k',
    benefits: ['Health Insurance', 'Stock Options', 'Remote First', '401k']
  }
];

export function JobsReferrals({ userRole }: JobsReferralsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('browse-jobs');
  const [selectedJob, setSelectedJob] = useState<typeof mockJobs[0] | null>(null);

  // Job Detail View
  if (selectedJob) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-4"
              onClick={() => setSelectedJob(null)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>

            <div className="space-y-6">
              {/* Job Header */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold mb-2">{selectedJob.title}</h1>
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{selectedJob.company}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedJob.posted}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{selectedJob.salary}</span>
                    </div>
                    <Badge variant="outline">{selectedJob.type}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">{selectedJob.referralsAvailable}</span> alumni can refer you for this position
                    </span>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h3 className="font-medium mb-2">About the Role</h3>
                <p className="text-muted-foreground">{selectedJob.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="font-medium mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-medium mb-2">Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.benefits.map((benefit, idx) => (
                    <Badge key={idx} variant="secondary">{benefit}</Badge>
                  ))}
                </div>
              </div>

              {/* Posted By */}
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground">Posted by</p>
                <p className="font-medium">{selectedJob.postedBy}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1">Ask for Referral</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Referral</DialogTitle>
                      <DialogDescription>
                        {selectedJob.title} at {selectedJob.company}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="message">Why are you a good fit?</Label>
                        <Textarea
                          id="message"
                          placeholder="Share your relevant experience and why you're interested in this role..."
                          rows={4}
                        />
                      </div>

                      <div>
                        <Label htmlFor="resume">Attach Resume</Label>
                        <Input id="resume" type="file" accept=".pdf,.doc,.docx" />
                      </div>

                      <Button className="w-full">Send Referral Request</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Original Post
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Jobs List View
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Jobs & Referrals</CardTitle>
          <CardDescription>Discover opportunities and get referrals from fellow alumni</CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse-jobs">Browse Jobs</TabsTrigger>
          <TabsTrigger value="post-job">Post a Job</TabsTrigger>
        </TabsList>

        <TabsContent value="browse-jobs" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, company, or skills..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {mockJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedJob(job)}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{job.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{job.company}</p>

                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{job.posted}</span>
                            </div>
                            <Badge variant="outline">{job.type}</Badge>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">
                              <span className="font-medium text-foreground">{job.referralsAvailable}</span> alumni can refer
                            </span>
                          </div>

                          <p className="text-xs text-muted-foreground mt-2">
                            Posted by {job.postedBy}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:w-auto w-full">
                      <Button className="w-full md:w-auto" onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                      }}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="post-job">
          <Card>
            <CardHeader>
              <CardTitle>Post a Job Opening</CardTitle>
              <CardDescription>Help fellow alumni find opportunities at your company</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" placeholder="e.g., Senior Software Engineer" />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Your company name" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., Bengaluru, India" />
                </div>
                <div>
                  <Label htmlFor="type">Job Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="salary">Salary Range</Label>
                <Input id="salary" placeholder="e.g., $100k - $150k" />
              </div>

              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, requirements, and responsibilities..."
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="requirements">Requirements (one per line)</Label>
                <Textarea
                  id="requirements"
                  placeholder="- 5+ years of experience&#10;- Strong knowledge of..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="applyLink">Application Link</Label>
                <Input id="applyLink" placeholder="https://careers.company.com/job-id" />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="canRefer" className="rounded" />
                <Label htmlFor="canRefer" className="font-normal cursor-pointer">
                  I can provide referrals for this position
                </Label>
              </div>

              <Button className="w-full">Post Job</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}