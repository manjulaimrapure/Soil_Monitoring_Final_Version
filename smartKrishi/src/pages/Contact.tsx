
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare, MapPin, Send, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our support team",
    value: "+1 (555) 123-4567",
    action: "Call Now",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a detailed message",
    value: "support@soilmonitor.com",
    action: "Email",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our agents in real time",
    value: "Available 24/7",
    action: "Start Chat",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
];

const faqItems = [
  {
    question: "How accurate are the soil sensors?",
    answer: "Our soil sensors have an accuracy rate of ±2% for moisture readings and ±0.1 for pH readings. They are calibrated before shipping and can be recalibrated through the app if needed."
  },
  {
    question: "How often should I calibrate my sensors?",
    answer: "We recommend calibrating your sensors every 3-6 months for optimal performance. However, if you notice any inconsistencies in readings, you may want to calibrate sooner."
  },
  {
    question: "What's the battery life of the sensors?",
    answer: "Our sensors are designed with low power consumption in mind. The battery typically lasts 12-18 months with normal use. You'll receive notifications when battery levels are getting low."
  },
  {
    question: "Can I use the system without internet connectivity?",
    answer: "The sensors will continue to collect data even without internet connectivity. However, to view the data on the dashboard or receive alerts, you'll need internet access to sync the data."
  },
];

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [activeTab, setActiveTab] = useState<number | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll respond shortly!",
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };
  
  const toggleFaq = (index: number) => {
    setActiveTab(activeTab === index ? null : index);
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-soil-800">Contact & Support</h1>
        <p className="text-soil-600 mt-2">
          We're here to help with any questions about soil monitoring or using our system.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactMethods.map((method, index) => (
          <Card key={index} className="border overflow-hidden shadow-sm">
            <CardContent className="p-6">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", method.bg)}>
                <method.icon className={cn("w-6 h-6", method.color)} />
              </div>
              <h3 className="text-lg font-semibold text-soil-800">{method.title}</h3>
              <p className="text-soil-600 text-sm mt-1">{method.description}</p>
              <div className="text-lg font-medium text-soil-800 mt-3">{method.value}</div>
              <Button 
                className={cn("mt-4 w-full", 
                  index === 0 ? "bg-green-500 hover:bg-green-600" :
                  index === 1 ? "bg-blue-500 hover:bg-blue-600" :
                  "bg-purple-500 hover:bg-purple-600"
                )}
                onClick={() => {
                  if (index === 2) {
                    toast({
                      title: "Live Chat",
                      description: "Connecting you to a support agent...",
                    });
                  }
                }}
              >
                {method.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-soil-800">Send Us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-soil-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-soil-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soil-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-soil-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-soil-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soil-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-soil-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-soil-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soil-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-soil-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-soil-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soil-500"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-soil-600 hover:bg-soil-700">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-soil-800">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border border-soil-200 rounded-md overflow-hidden">
                    <button
                      className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="font-medium text-soil-800">{item.question}</span>
                      <span className={cn(
                        "transform transition-transform",
                        activeTab === index ? "rotate-180" : ""
                      )}>
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            d="M4 6L8 10L12 6" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                          />
                        </svg>
                      </span>
                    </button>
                    {activeTab === index && (
                      <div className="p-4 pt-0 text-soil-600 bg-soil-50">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-soil-800">Headquarters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-soil-500 mt-0.5" />
                <div>
                  <p className="text-soil-700">
                    SoilMonitoring Technologies Inc.
                    <br />
                    1234 Innovation Way
                    <br />
                    Agritech Valley, CA 94123
                    <br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex items-start space-x-3">
                <Clock className="w-5 h-5 text-soil-500 mt-0.5" />
                <div>
                  <p className="text-soil-700">
                    <strong>Business Hours:</strong>
                    <br />
                    Monday to Friday: 9:00 AM - 6:00 PM (PST)
                    <br />
                    Saturday: 10:00 AM - 2:00 PM (PST)
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
