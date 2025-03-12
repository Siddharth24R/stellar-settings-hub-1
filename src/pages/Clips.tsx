
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play, Download, Calendar, Clock, Filter } from 'lucide-react';

const Clips = () => {
  const [selectedDate, setSelectedDate] = useState('all');
  
  // Mock clips data that would come from a Python backend
  const mockClips = [
    { 
      id: 1, 
      thumbnail: 'https://placehold.co/320x180/333/FFF?text=Clip+1',
      date: '2023-08-15',
      time: '08:23 AM',
      duration: '00:42',
      title: 'Front Door - Motion Detected'
    },
    { 
      id: 2, 
      thumbnail: 'https://placehold.co/320x180/333/FFF?text=Clip+2',
      date: '2023-08-15',
      time: '11:47 AM',
      duration: '01:23',
      title: 'Front Door - Person Detected'
    },
    { 
      id: 3, 
      thumbnail: 'https://placehold.co/320x180/333/FFF?text=Clip+3',
      date: '2023-08-14',
      time: '03:15 PM',
      duration: '00:35',
      title: 'Front Door - Motion Detected'
    },
    { 
      id: 4, 
      thumbnail: 'https://placehold.co/320x180/333/FFF?text=Clip+4',
      date: '2023-08-13',
      time: '09:30 PM',
      duration: '01:05',
      title: 'Front Door - Person Detected'
    },
    { 
      id: 5, 
      thumbnail: 'https://placehold.co/320x180/333/FFF?text=Clip+5',
      date: '2023-08-13',
      time: '06:42 AM',
      duration: '00:52',
      title: 'Front Door - Motion Detected'
    },
  ];
  
  // Filter clips by date if needed
  const filteredClips = selectedDate === 'all' 
    ? mockClips 
    : mockClips.filter(clip => clip.date === selectedDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-black/40 border border-blue-400/30 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              asChild
              variant="ghost" 
              size="icon"
              className="mr-2 text-blue-300 hover:text-blue-200 hover:bg-black/40"
            >
              <Link to="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-white">Clips</h1>
          </div>
          <div className="flex items-center">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-2">
              67
            </div>
            <span className="text-sm text-orange-300">Stored Clips</span>
          </div>
        </header>

        <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-300 text-lg">Recorded Clips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-300 mr-2" />
                <select 
                  className="bg-black/60 text-white border border-blue-400/30 rounded-md px-3 py-1 text-sm"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="all">All Dates</option>
                  <option value="2023-08-15">Today (Aug 15)</option>
                  <option value="2023-08-14">Yesterday (Aug 14)</option>
                  <option value="2023-08-13">Aug 13, 2023</option>
                </select>
              </div>
              
              <Button variant="outline" size="sm" className="border-blue-400/30 text-blue-300">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            
            <div className="space-y-4">
              {filteredClips.map(clip => (
                <div key={clip.id} className="bg-black/60 rounded-lg overflow-hidden border border-blue-400/20">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3 relative">
                      <img 
                        src={clip.thumbnail} 
                        alt={clip.title} 
                        className="w-full h-auto sm:h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                        {clip.duration}
                      </div>
                    </div>
                    <div className="p-4 sm:w-2/3 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-blue-200">{clip.title}</h3>
                        <div className="flex items-center text-sm text-blue-100/70 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span className="mr-3">{clip.date}</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{clip.time}</span>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Play className="h-4 w-4 mr-1" />
                          Play
                        </Button>
                        <Button size="sm" variant="outline" className="border-blue-400/30 text-blue-300">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredClips.length === 0 && (
              <div className="text-center py-10">
                <p className="text-blue-100/70">No clips found for the selected date.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Python Integration</h3>
            <p className="text-sm text-blue-100/70">
              These clips are processed and stored by a Python backend that handles:
            </p>
            <ul className="list-disc list-inside mt-2 text-sm text-blue-100/70 space-y-1">
              <li>Video encoding and compression</li>
              <li>Cloud storage synchronization</li>
              <li>Metadata generation and indexing</li>
              <li>AI-based event classification</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Clips;
