
import React from 'react';
import { Shield, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-400 to-green-400 rounded-lg p-2">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">DigitalDetox</h1>
              <p className="text-xs text-blue-200">Harmony Space</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-blue-200 transition-colors font-medium">
              Features
            </a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors font-medium">
              Pricing
            </a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors font-medium">
              About
            </a>
            <a href="/dashboard" className="text-white hover:text-blue-200 transition-colors font-medium">
              Dashboard
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 hover:text-white border-white/30"
            >
              Log In
            </Button>
            <Button 
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Menu className="w-6 h-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="bg-white/10 backdrop-blur-md border-white/20 text-white"
              >
                <DropdownMenuItem className="hover:bg-white/20">
                  Features
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/20">
                  Pricing
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/20">
                  About
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/20">
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/20">
                  <User className="w-4 h-4 mr-2" />
                  Log In
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/20">
                  <User className="w-4 h-4 mr-2" />
                  Sign Up
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
