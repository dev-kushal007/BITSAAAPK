import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { MessageSquare, Send, Search, Shield, CheckCheck, Clock, Ban, AlertTriangle, Eye, CheckCircle, XCircle, AlertCircle, Info, ArrowLeft, MoreVertical, UserMinus, Plus, Paperclip, Image as ImageIcon, FileText, MapPin, Smile, X, Reply } from 'lucide-react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';

interface MessagingProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

interface Conversation {
  id: number;
  name: string;
  role: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: 'approved' | 'pending';
  requiresApproval?: boolean;
}

interface MessageRequest {
  id: number;
  senderId: number;
  senderName: string;
  senderRole: string;
  message: string;
  timestamp: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Senior Software Engineer at Google',
    lastMessage: 'Thanks for connecting! Would love to discuss the role.',
    timestamp: '2 hours ago',
    unread: 2,
    status: 'approved'
  },
  {
    id: 2,
    name: 'Priya Menon',
    role: 'Product Manager at Microsoft',
    lastMessage: 'Sure, I can help with that referral.',
    timestamp: 'Yesterday',
    unread: 0,
    status: 'approved'
  },
  {
    id: 3,
    name: 'Ankit Verma',
    role: 'Data Scientist at Amazon',
    lastMessage: 'That sounds like a great opportunity!',
    timestamp: '2 days ago',
    unread: 1,
    status: 'approved'
  }
];

const mockMessageRequests: MessageRequest[] = [
  {
    id: 1,
    senderId: 3,
    senderName: 'Amit Patel',
    senderRole: 'Design Engineer at Tesla',
    message: 'Hi! I saw you are also from BITS Pilani. Would love to connect and discuss career opportunities in your field.',
    timestamp: '2 days ago'
  },
  {
    id: 2,
    senderId: 4,
    senderName: 'Sneha Reddy',
    senderRole: 'VP at Goldman Sachs',
    message: 'Hello! I am looking to hire for my team and noticed your impressive profile.',
    timestamp: '3 days ago'
  }
];

const mockMessagesData: { [key: number]: Message[] } = {
  1: [
    {
      id: 1,
      sender: 'Rahul Sharma',
      content: 'Hi! I saw you are working at Google. I am looking for opportunities in ML. Would you be open to chatting?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'Hey Rahul! Sure, I would be happy to help. What kind of roles are you looking for?',
      timestamp: '10:35 AM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Rahul Sharma',
      content: 'Thanks for connecting! Would love to discuss the role.',
      timestamp: '11:20 AM',
      isOwn: false
    }
  ],
  2: [
    {
      id: 1,
      sender: 'Priya Menon',
      content: 'Hey! Do you have any experience with referrals at Microsoft?',
      timestamp: 'Yesterday 9:00 AM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'Yes! I can help you with that. What position are you interested in?',
      timestamp: 'Yesterday 9:15 AM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Priya Menon',
      content: 'Sure, I can help with that referral.',
      timestamp: 'Yesterday 10:00 AM',
      isOwn: false
    }
  ],
  3: [
    {
      id: 1,
      sender: 'Ankit Verma',
      content: 'Hi! I heard you are planning to relocate to Seattle. I can help with some tips!',
      timestamp: '2 days ago 3:00 PM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'That would be amazing! What should I know about the area?',
      timestamp: '2 days ago 3:30 PM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Ankit Verma',
      content: 'That sounds like a great opportunity!',
      timestamp: '2 days ago 4:00 PM',
      isOwn: false
    }
  ]
};

export function Messaging({ userRole }: MessagingProps) {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [messageRequests, setMessageRequests] = useState<MessageRequest[]>(mockMessageRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'conversations' | 'requests'>('conversations');
  
  // Safety dialog states
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [blockUser, setBlockUser] = useState(false);

  const handleApproveRequest = (requestId: number) => {
    const request = messageRequests.find(r => r.id === requestId);
    if (request) {
      // Add to conversations
      const newConversation: Conversation = {
        id: request.senderId,
        name: request.senderName,
        role: request.senderRole,
        lastMessage: request.message,
        timestamp: 'Just now',
        unread: 0,
        status: 'approved'
      };
      setConversations([newConversation, ...conversations]);
      // Remove from requests
      setMessageRequests(messageRequests.filter(r => r.id !== requestId));
      // Switch to conversations tab
      setActiveTab('conversations');
    }
  };

  const handleDeclineRequest = (requestId: number) => {
    setMessageRequests(messageRequests.filter(r => r.id !== requestId));
  };

  const handleBlockUser = () => {
    console.log('User blocked');
    setShowBlockDialog(false);
    setSelectedConversation(null);
  };

  const handleReportUser = () => {
    console.log('User reported:', reportReason);
    setShowReportDialog(false);
    setReportReason('');
    setBlockUser(false);
  };

  const handleDisconnectUser = () => {
    console.log('User disconnected');
    setConversations(conversations.filter(c => c.id !== selectedConversation));
    setShowDisconnectDialog(false);
    setSelectedConversation(null);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const messages = selectedConversation ? mockMessagesData[selectedConversation] || [] : [];

  // Messages List Component
  const MessagesList = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="conversations" className="relative">
              Conversations
              {conversations.some(c => c.unread > 0) && (
                <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-[#8B1538]">
                  {conversations.reduce((sum, c) => sum + c.unread, 0)}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="requests" className="relative">
              Requests
              {messageRequests.length > 0 && (
                <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-[#8B1538]">
                  {messageRequests.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        {activeTab === 'conversations' ? (
          <div className="divide-y divide-border">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">No conversations yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect with alumni to start messaging
                </p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`w-full p-4 text-left hover:bg-secondary/50 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-secondary' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-semibold text-primary">
                        {conversation.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-medium truncate">{conversation.name}</p>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mb-1">
                        {conversation.role}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <Badge className="flex-shrink-0 h-5 w-5 p-0 flex items-center justify-center bg-[#8B1538]">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {messageRequests.length === 0 ? (
              <div className="p-8 text-center">
                <Clock className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">No pending requests</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Message requests will appear here
                </p>
              </div>
            ) : (
              messageRequests.map((request) => (
                <div key={request.id} className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-semibold text-primary">
                        {request.senderName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-medium">{request.senderName}</p>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {request.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {request.senderRole}
                      </p>
                      <p className="text-sm text-foreground mb-3">
                        {request.message}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-[#8B1538] hover:bg-[#8B1538]/90"
                          onClick={() => handleApproveRequest(request.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleDeclineRequest(request.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );

  // Conversation View Component
  const ConversationView = () => {
    const [messageText, setMessageText] = useState('');
    const [replyingTo, setReplyingTo] = useState<Message | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    }, [messageText]);

    const handleSendMessage = () => {
      if (messageText.trim()) {
        console.log('Sending message:', messageText);
        if (replyingTo) {
          console.log('Replying to:', replyingTo);
        }
        setMessageText('');
        setReplyingTo(null);
      }
    };

    const handleReply = (message: Message) => {
      setReplyingTo(message);
      textareaRef.current?.focus();
    };

    const handleAttachment = (type: string) => {
      console.log('Attachment type:', type);
    };

    if (!selectedConv) {
      return (
        <div className="h-full flex items-center justify-center p-8 text-center">
          <div>
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
            <p className="text-sm text-muted-foreground">
              Choose a conversation from the list to start messaging
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border bg-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile back button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSelectedConversation(null)}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-semibold text-primary">
                {selectedConv.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium">{selectedConv.name}</p>
              <p className="text-xs text-muted-foreground">{selectedConv.role}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowDisconnectDialog(true)}>
                <UserMinus className="w-4 h-4 mr-2" />
                Disconnect
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowBlockDialog(true)}>
                <Ban className="w-4 h-4 mr-2" />
                Block User
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowReportDialog(true)}>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 group relative ${
                    message.isOwn
                      ? 'bg-[#8B1538] text-white'
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <p
                      className={`text-xs ${
                        message.isOwn ? 'text-white/70' : 'text-muted-foreground'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                    {!message.isOwn && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                        onClick={() => handleReply(message)}
                      >
                        <Reply className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-border bg-card">
          {/* Reply Banner */}
          {replyingTo && (
            <div className="px-4 pt-3 pb-2 bg-secondary/50 flex items-center justify-between">
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <Reply className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">
                    Replying to {replyingTo.sender}
                  </p>
                  <p className="text-sm truncate">{replyingTo.content}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 flex-shrink-0"
                onClick={() => setReplyingTo(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="p-4 flex items-end gap-2">
            {/* Attachment Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <Plus className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="top">
                <DropdownMenuItem onClick={() => handleAttachment('document')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Document
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAttachment('image')}>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Photo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAttachment('location')}>
                  <MapPin className="w-4 h-4 mr-2" />
                  Location
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAttachment('contact')}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Text Input */}
            <textarea
              ref={textareaRef}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type a message..."
              className="flex-1 resize-none border border-input bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 max-h-[96px] overflow-y-auto leading-5"
              rows={1}
              style={{ height: 'auto', minHeight: '40px' }}
            />

            {/* Send Button */}
            <Button
              size="sm"
              className="bg-[#8B1538] hover:bg-[#8B1538]/90 flex-shrink-0"
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Privacy Notice */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          All messages after request approval are private. You can block or report users at any time.
        </AlertDescription>
      </Alert>

      {/* Main Content */}
      <Card className="overflow-hidden">
        <div className="lg:grid lg:grid-cols-[400px,1fr] h-[calc(100vh-250px)]">
          {/* Messages List - Always visible on desktop, hidden when conversation selected on mobile */}
          <div className={`border-r border-border ${selectedConversation && 'hidden lg:block'}`}>
            <MessagesList />
          </div>

          {/* Conversation View - Only visible when conversation selected on mobile, always visible on desktop */}
          <div className={`${!selectedConversation && 'hidden lg:block'}`}>
            <ConversationView />
          </div>
        </div>
      </Card>

      {/* Block Dialog */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block User</DialogTitle>
            <DialogDescription>
              Are you sure you want to block {selectedConv?.name}? They will no longer be able to message you.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBlockUser}>
              Block User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report User</DialogTitle>
            <DialogDescription>
              Help us keep BITSAA safe. Tell us why you are reporting {selectedConv?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Reason for reporting</Label>
              <Textarea
                placeholder="Please describe the issue..."
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="block-user"
                checked={blockUser}
                onCheckedChange={(checked) => setBlockUser(checked as boolean)}
              />
              <label
                htmlFor="block-user"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Also block this user
              </label>
            </div>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Reports are reviewed by BITSAA admins within 24-48 hours. Your identity will remain confidential.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleReportUser} disabled={!reportReason.trim()}>
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Disconnect Dialog */}
      <Dialog open={showDisconnectDialog} onOpenChange={setShowDisconnectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disconnect User</DialogTitle>
            <DialogDescription>
              Are you sure you want to disconnect {selectedConv?.name}? They will no longer be able to message you.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDisconnectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDisconnectUser}>
              Disconnect User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}