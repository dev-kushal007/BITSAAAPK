import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, MapPin, Briefcase, GraduationCap, Mail, MessageSquare, Shield, Phone, Linkedin, Filter, ChevronDown, ChevronUp, LayoutGrid, LayoutList, Lock, UserCheck, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface AlumniDirectoryProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

type ContactRequestStatus = 'pending' | 'approved' | 'declined' | 'expired';

interface ContactRequest {
  id: number;
  requesterId: number;
  requesterName: string;
  targetId: number;
  reason: string;
  message: string;
  status: ContactRequestStatus;
  timestamp: string;
}

const mockAlumni = [
  {
    id: 1,
    name: 'Rahul Sharma',
    batch: '2015',
    campus: 'Pilani',
    degree: 'B.E. Computer Science',
    company: 'Google',
    role: 'Senior Software Engineer',
    location: 'Bengaluru, India',
    industry: 'Technology',
    skills: ['Machine Learning', 'Python', 'Cloud Architecture'],
    privacy: { email: 'hidden', phone: 'hidden', linkedin: 'public', location: 'public', company: 'public' },
    availableForMentorship: true
  },
  {
    id: 2,
    name: 'Priya Menon',
    batch: '2012',
    campus: 'Goa',
    degree: 'B.E. Electronics',
    company: 'Microsoft',
    role: 'Product Manager',
    location: 'Seattle, USA',
    industry: 'Technology',
    skills: ['Product Strategy', 'B2B SaaS', 'Agile'],
    privacy: { email: 'public', phone: 'hidden', linkedin: 'public', location: 'public', company: 'public' },
    availableForMentorship: true
  },
  {
    id: 3,
    name: 'Amit Patel',
    batch: '2018',
    campus: 'Hyderabad',
    degree: 'B.E. Mechanical',
    company: 'Tesla',
    role: 'Design Engineer',
    location: 'San Francisco, USA',
    industry: 'Automotive',
    skills: ['CAD', 'Automotive Design', 'Innovation'],
    privacy: { email: 'approval', phone: 'hidden', linkedin: 'public', location: 'public', company: 'public' },
    availableForMentorship: false
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    batch: '2016',
    campus: 'Pilani',
    degree: 'B.E. Electrical',
    company: 'Goldman Sachs',
    role: 'Vice President',
    location: 'Mumbai, India',
    industry: 'Finance',
    skills: ['Investment Banking', 'Finance', 'Strategy'],
    privacy: { email: 'approval', phone: 'approval', linkedin: 'public', location: 'public', company: 'approval' },
    availableForMentorship: true
  },
  {
    id: 5,
    name: 'Karthik Iyer',
    batch: '2014',
    campus: 'Goa',
    degree: 'M.Sc. Economics',
    company: 'McKinsey & Company',
    role: 'Senior Consultant',
    location: 'London, UK',
    industry: 'Consulting',
    skills: ['Consulting', 'Data Analysis', 'Business Strategy'],
    privacy: { email: 'public', phone: 'hidden', linkedin: 'public', location: 'public', company: 'public' },
    availableForMentorship: true
  },
  {
    id: 6,
    name: 'Ananya Singh',
    batch: '2019',
    campus: 'Pilani',
    degree: 'B.E. Computer Science',
    company: 'Amazon',
    role: 'SDE II',
    location: 'Bengaluru, India',
    industry: 'Technology',
    skills: ['Backend Development', 'Distributed Systems', 'Java'],
    privacy: { email: 'hidden', phone: 'hidden', linkedin: 'approval', location: 'approval', company: 'public' },
    availableForMentorship: false
  }
];

export function AlumniDirectory({ userRole }: AlumniDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [batchFilter, setBatchFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [skillsFilter, setSkillsFilter] = useState('all');
  const [mentorshipFilter, setMentorshipFilter] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<typeof mockAlumni[0] | null>(null);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'compact' | 'detailed'>('detailed');
  
  // Contact Request state
  const [showContactRequestDialog, setShowContactRequestDialog] = useState(false);
  const [contactRequestReason, setContactRequestReason] = useState('');
  const [contactRequestMessage, setContactRequestMessage] = useState('');
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([
    {
      id: 1,
      requesterId: 7,
      requesterName: 'Vikram Desai',
      targetId: 1,
      reason: 'Networking',
      message: 'Hi, I am also working in ML space and would love to connect!',
      status: 'pending',
      timestamp: '2024-01-15T10:30:00'
    },
    {
      id: 2,
      requesterId: 8,
      requesterName: 'Meera Shah',
      targetId: 1,
      reason: 'Job Opportunity',
      message: 'Looking for opportunities in your team.',
      status: 'pending',
      timestamp: '2024-01-14T15:20:00'
    }
  ]);

  const filteredAlumni = mockAlumni.filter(alumni => {
    const matchesSearch = 
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = locationFilter === 'all' || alumni.location.includes(locationFilter);
    const matchesBatch = batchFilter === 'all' || alumni.batch === batchFilter;
    const matchesIndustry = industryFilter === 'all' || alumni.industry === industryFilter;
    const matchesCompany = companyFilter === 'all' || alumni.company === companyFilter;
    const matchesMentorship = !mentorshipFilter || alumni.availableForMentorship;

    return matchesSearch && matchesLocation && matchesBatch && matchesIndustry && matchesCompany && matchesMentorship;
  });

  const handleSendContactRequest = () => {
    if (selectedAlumni && contactRequestReason) {
      const newRequest: ContactRequest = {
        id: contactRequests.length + 1,
        requesterId: 999, // Current user
        requesterName: 'You',
        targetId: selectedAlumni.id,
        reason: contactRequestReason,
        message: contactRequestMessage,
        status: 'pending',
        timestamp: new Date().toISOString()
      };
      setContactRequests([...contactRequests, newRequest]);
      setShowContactRequestDialog(false);
      setContactRequestReason('');
      setContactRequestMessage('');
    }
  };

  const handleContactRequestAction = (requestId: number, action: 'approved' | 'declined') => {
    setContactRequests(contactRequests.map(req => 
      req.id === requestId ? { ...req, status: action } : req
    ));
  };

  const getPrivacyIcon = (level: string) => {
    switch (level) {
      case 'public': return '🟢';
      case 'approval': return '🔵';
      case 'hidden': return '🔴';
      default: return '⚪';
    }
  };

  const renderContactField = (field: string, icon: any, value: string, privacyLevel: string) => {
    const Icon = icon;
    return (
      <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">{field}</span>
        </div>
        {privacyLevel === 'public' ? (
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            🟢 {value}
          </span>
        ) : privacyLevel === 'approval' ? (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setShowContactRequestDialog(true)}
            className="text-xs"
          >
            <Lock className="w-3 h-3 mr-1" />
            Request Access
          </Button>
        ) : (
          <Badge variant="secondary" className="text-xs">
            🔒 Private - Request needed
          </Badge>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Tabs for Directory and Requests */}
      <Tabs defaultValue="directory" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="directory">Alumni Directory</TabsTrigger>
          <TabsTrigger value="requests">
            Contact Requests
            {contactRequests.filter(r => r.status === 'pending').length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {contactRequests.filter(r => r.status === 'pending').length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Directory Tab */}
        <TabsContent value="directory" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            {!isFilterExpanded ? (
              // Collapsed view - only search box and filter icon
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, company, or skills..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setIsFilterExpanded(true)}
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            ) : (
              // Expanded view - all filters
              <>
                <CardHeader className="cursor-pointer" onClick={() => setIsFilterExpanded(false)}>
                  <div className="flex items-center justify-between">
                    <div className="relative flex-1 mr-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name, company, or skills..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Industry</label>
                      <Select value={industryFilter} onValueChange={setIndustryFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Industries</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Consulting">Consulting</SelectItem>
                          <SelectItem value="Automotive">Automotive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Location</label>
                      <Select value={locationFilter} onValueChange={setLocationFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          <SelectItem value="Bengaluru">Bengaluru</SelectItem>
                          <SelectItem value="Mumbai">Mumbai</SelectItem>
                          <SelectItem value="USA">USA</SelectItem>
                          <SelectItem value="UK">UK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Batch</label>
                      <Select value={batchFilter} onValueChange={setBatchFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Batches</SelectItem>
                          <SelectItem value="2012">2012</SelectItem>
                          <SelectItem value="2014">2014</SelectItem>
                          <SelectItem value="2015">2015</SelectItem>
                          <SelectItem value="2016">2016</SelectItem>
                          <SelectItem value="2018">2018</SelectItem>
                          <SelectItem value="2019">2019</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Company</label>
                      <Select value={companyFilter} onValueChange={setCompanyFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Companies</SelectItem>
                          <SelectItem value="Google">Google</SelectItem>
                          <SelectItem value="Microsoft">Microsoft</SelectItem>
                          <SelectItem value="Amazon">Amazon</SelectItem>
                          <SelectItem value="Tesla">Tesla</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Campus</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All Campuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Campuses</SelectItem>
                          <SelectItem value="pilani">Pilani</SelectItem>
                          <SelectItem value="goa">Goa</SelectItem>
                          <SelectItem value="hyderabad">Hyderabad</SelectItem>
                          <SelectItem value="dubai">Dubai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={mentorshipFilter}
                          onChange={(e) => setMentorshipFilter(e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-muted-foreground">Available for mentorship</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </>
            )}
          </Card>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Found <span className="font-medium text-foreground">{filteredAlumni.length}</span> alumni
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'compact' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('compact')}
                  className={viewMode === 'compact' ? 'bg-[#8B1538] hover:bg-[#8B1538]/90' : ''}
                >
                  <LayoutGrid className="w-4 h-4 mr-1" />
                  Compact
                </Button>
                <Button
                  variant={viewMode === 'detailed' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('detailed')}
                  className={viewMode === 'detailed' ? 'bg-[#8B1538] hover:bg-[#8B1538]/90' : ''}
                >
                  <LayoutList className="w-4 h-4 mr-1" />
                  Detailed
                </Button>
              </div>
            </div>

            <div className={`grid gap-4 ${viewMode === 'compact' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {filteredAlumni.map((alumni) => (
                <Card key={alumni.id} className="hover:shadow-md transition-shadow hover:border-[#8B1538]/20">
                  <CardContent className={viewMode === 'compact' ? 'p-4' : 'p-6'}>
                    <div className={`flex ${viewMode === 'compact' ? 'items-center gap-3 mb-3' : 'items-start justify-between mb-3'}`}>
                      <div className={`${viewMode === 'compact' ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-[#8B1538] text-white flex items-center justify-center flex-shrink-0`}>
                        <span className={`${viewMode === 'compact' ? 'text-sm' : 'text-lg'} font-medium`}>{alumni.name.charAt(0)}</span>
                      </div>
                      {viewMode === 'detailed' && alumni.availableForMentorship && (
                        <Badge variant="secondary" className="text-xs">Mentor</Badge>
                      )}
                      {viewMode === 'compact' && (
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground text-sm truncate">{alumni.name}</h3>
                          <p className="text-xs text-muted-foreground truncate">{alumni.company}</p>
                        </div>
                      )}
                    </div>

                    {viewMode === 'detailed' && (
                      <>
                        <h3 className="font-medium text-foreground mb-1">{alumni.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{alumni.role}</p>
                      </>
                    )}

                    <div className={`space-y-${viewMode === 'compact' ? '1.5' : '2'} mb-${viewMode === 'compact' ? '3' : '4'}`}>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Briefcase className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{alumni.company}</span>
                      </div>
                      {alumni.privacy.location === 'public' ? (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{alumni.location}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Lock className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">Location private</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <GraduationCap className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{alumni.batch} • {alumni.campus}</span>
                      </div>
                    </div>

                    {viewMode === 'compact' && alumni.availableForMentorship && (
                      <Badge variant="secondary" className="text-xs mb-3">Mentor</Badge>
                    )}

                    {viewMode === 'detailed' && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {alumni.skills.slice(0, 2).map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {alumni.skills.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{alumni.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-xs hover:bg-[#8B1538]/5 hover:border-[#8B1538]/50" 
                          onClick={() => setSelectedAlumni(alumni)}
                        >
                          View Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <div className="flex items-start gap-4 mb-2">
                            <div className="w-16 h-16 rounded-full bg-[#8B1538] text-white flex items-center justify-center flex-shrink-0">
                              <span className="text-2xl font-medium">{alumni.name.charAt(0)}</span>
                            </div>
                            <div className="flex-1">
                              <DialogTitle className="text-2xl">{alumni.name}</DialogTitle>
                              <DialogDescription className="text-base mt-1">{alumni.role} at {alumni.company}</DialogDescription>
                              {alumni.availableForMentorship && (
                                <Badge className="mt-2 bg-[#8B1538] hover:bg-[#8B1538]/90">Available for Mentorship</Badge>
                              )}
                            </div>
                          </div>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Privacy Indicator */}
                          <div className="bg-[#8B1538]/5 border border-[#8B1538]/20 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <Shield className="w-4 h-4 text-[#8B1538] mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs font-medium text-[#8B1538] mb-1">Privacy Protected Profile</p>
                                <p className="text-xs text-muted-foreground">
                                  Some contact details require approval. Click "Request Access" to send a request.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Contact Options */}
                          <div>
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <UserCheck className="w-4 h-4 text-[#8B1538]" />
                              Contact Information
                            </h4>
                            <div className="space-y-2">
                              {renderContactField('Email', Mail, 'email@example.com', alumni.privacy.email)}
                              {renderContactField('Phone', Phone, '+91 98765 43210', alumni.privacy.phone)}
                              {renderContactField('LinkedIn', Linkedin, 'linkedin.com/in/profile', alumni.privacy.linkedin)}
                            </div>
                          </div>

                          {/* About */}
                          <div>
                            <h4 className="font-medium mb-3">About</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Degree:</span>
                                <span>{alumni.degree}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Batch:</span>
                                <span>{alumni.batch}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Campus:</span>
                                <span>{alumni.campus}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Industry:</span>
                                <span>{alumni.industry}</span>
                              </div>
                            </div>
                          </div>

                          {/* Skills */}
                          <div>
                            <h4 className="font-medium mb-3">Skills & Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                              {alumni.skills.map((skill, idx) => (
                                <Badge key={idx} variant="secondary">{skill}</Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button className="flex-1 bg-[#8B1538] hover:bg-[#8B1538]/90">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Send Message
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => setShowContactRequestDialog(true)}
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Request Contact
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Contact Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incoming Contact Requests</CardTitle>
              <p className="text-sm text-muted-foreground">
                Alumni requesting access to your contact information
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactRequests.filter(r => r.status === 'pending').length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No pending contact requests</p>
                </div>
              ) : (
                contactRequests.filter(r => r.status === 'pending').map((request) => (
                  <div key={request.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 rounded-full bg-[#8B1538] text-white flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium">{request.requesterName.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{request.requesterName}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{request.reason}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(request.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    </div>

                    {request.message && (
                      <div className="bg-secondary/50 rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">{request.message}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-[#8B1538] hover:bg-[#8B1538]/90"
                        onClick={() => handleContactRequestAction(request.id, 'approved')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleContactRequestAction(request.id, 'declined')}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Decline
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Request History */}
          {contactRequests.filter(r => r.status !== 'pending').length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Request History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contactRequests.filter(r => r.status !== 'pending').map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#8B1538] text-white flex items-center justify-center">
                        <span className="text-xs font-medium">{request.requesterName.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{request.requesterName}</p>
                        <p className="text-xs text-muted-foreground">{request.reason}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={request.status === 'approved' ? 'default' : 'secondary'}
                      className={request.status === 'approved' ? 'bg-green-600' : ''}
                    >
                      {request.status === 'approved' ? (
                        <><CheckCircle className="w-3 h-3 mr-1" /> Approved</>
                      ) : (
                        <><XCircle className="w-3 h-3 mr-1" /> Declined</>
                      )}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Contact Request Dialog */}
      <Dialog open={showContactRequestDialog} onOpenChange={setShowContactRequestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Contact Information</DialogTitle>
            <DialogDescription>
              Request access to {selectedAlumni?.name}'s contact details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Reason for request *</Label>
              <RadioGroup value={contactRequestReason} onValueChange={setContactRequestReason}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary/50 cursor-pointer">
                  <RadioGroupItem value="Networking" id="networking" />
                  <Label htmlFor="networking" className="cursor-pointer flex-1">Networking</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary/50 cursor-pointer">
                  <RadioGroupItem value="Job Opportunity" id="job" />
                  <Label htmlFor="job" className="cursor-pointer flex-1">Job Opportunity</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary/50 cursor-pointer">
                  <RadioGroupItem value="Mentorship" id="mentorship" />
                  <Label htmlFor="mentorship" className="cursor-pointer flex-1">Mentorship</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary/50 cursor-pointer">
                  <RadioGroupItem value="Collaboration" id="collaboration" />
                  <Label htmlFor="collaboration" className="cursor-pointer flex-1">Collaboration</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary/50 cursor-pointer">
                  <RadioGroupItem value="Investing" id="investing" />
                  <Label htmlFor="investing" className="cursor-pointer flex-1">Investing</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a personal message to your request..."
                value={contactRequestMessage}
                onChange={(e) => setContactRequestMessage(e.target.value)}
                rows={3}
              />
            </div>

            <div className="bg-[#8B1538]/5 border border-[#8B1538]/20 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">
                <Shield className="w-3 h-3 inline mr-1" />
                The recipient will see your profile and can accept or decline your request.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContactRequestDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSendContactRequest}
              disabled={!contactRequestReason}
              className="bg-[#8B1538] hover:bg-[#8B1538]/90"
            >
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}