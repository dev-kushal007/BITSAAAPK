import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Globe, MapPin, Users } from 'lucide-react';

interface GlobalMapProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

const regions = [
  { name: 'North America', alumni: 2450, chapters: 12 },
  { name: 'Europe', alumni: 1680, chapters: 8 },
  { name: 'Asia Pacific', alumni: 5240, chapters: 18 },
  { name: 'Middle East', alumni: 890, chapters: 4 },
  { name: 'Latin America', alumni: 320, chapters: 2 }
];

export function GlobalMap({ userRole }: GlobalMapProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-6 h-6 text-primary" />
            <CardTitle>Global Alumni Map</CardTitle>
          </div>
          <CardDescription>
            Discover where BITSians are making an impact worldwide
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Interactive world map visualization</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="font-medium mb-4">Alumni by Region</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {regions.map((region) => (
            <Card key={region.name}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">{region.name}</h4>
                  </div>
                  <Badge variant="secondary">{region.chapters} chapters</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{region.alumni.toLocaleString()} alumni</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}