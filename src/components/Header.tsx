import { motion } from 'framer-motion';
import { LogOut, User, Heart, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Link, useLocation } from 'react-router-dom';
import Button from '@/components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-border z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-hero p-2 rounded-full">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-playfair text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">
                LoveLense
              </span>
            </motion.div>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/create" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/create' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Create Gift
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              My Gifts
            </Link>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-medium">
                  {user.displayName || user.email}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">{user.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard" className="flex items-center w-full cursor-pointer">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  My Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
