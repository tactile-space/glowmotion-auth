
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedInput } from '@/components/AnimatedInput';
import { AnimatedButton } from '@/components/AnimatedButton';
import { Particles } from '@/components/Particles';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type AuthMode = 'login' | 'signup';

interface FormState {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  password: '',
};

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (mode === 'signup' && !formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email is not valid';
    }
    
    if (!formState.password) {
      newErrors.password = 'Password is required';
    } else if (formState.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      if (mode === 'login') {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in."
        });
      } else {
        toast({
          title: "Account created!",
          description: "Your account has been created successfully."
        });
      }
      
      // Redirect to dashboard or home
      navigate('/');
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
    setErrors({});
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-12">
      <Particles className="absolute inset-0 z-0" quantity={40} />
      
      <div className="absolute inset-0 z-0 bg-gradient-radial from-transparent to-white/30 opacity-70" />
      
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground text-glow animate-pulse-slow">
            Pickcreator
          </h1>
          <p className="mt-2 text-muted-foreground animate-fade-in">
            {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card backdrop-blur-xl p-8 shadow-glow"
        >
          <div className="mb-6 flex rounded-lg bg-muted p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-medium transition-all duration-300",
                mode === 'login' 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-medium transition-all duration-300",
                mode === 'signup' 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Sign up
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              {mode === 'signup' && (
                <motion.div
                  key="name-field"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                  custom={0}
                >
                  <AnimatedInput
                    label="Full Name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    icon={<User size={18} />}
                    error={errors.name}
                  />
                </motion.div>
              )}
              
              <motion.div
                key="email-field"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={variants}
                custom={mode === 'signup' ? 1 : 0}
              >
                <AnimatedInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  icon={<Mail size={18} />}
                  error={errors.email}
                />
              </motion.div>
              
              <motion.div
                key="password-field"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={variants}
                custom={mode === 'signup' ? 2 : 1}
              >
                <AnimatedInput
                  label="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleInputChange}
                  icon={<Lock size={18} />}
                  error={errors.password}
                />
              </motion.div>
            </div>
            
            {mode === 'login' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-right"
              >
                <button 
                  type="button" 
                  className="text-sm text-primary/80 hover:text-primary transition-colors"
                >
                  Forgot password?
                </button>
              </motion.div>
            )}
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={variants}
              custom={mode === 'signup' ? 3 : 2}
              className="mt-6"
            >
              <AnimatedButton
                type="submit"
                variant="shimmer"
                className="w-full font-medium tracking-wide"
                disabled={isLoading}
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                  {!isLoading && <ArrowRight size={16} />}
                </span>
              </AnimatedButton>
            </motion.div>
          </form>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            custom={mode === 'signup' ? 4 : 3}
            className="mt-6 text-center text-sm"
          >
            <p className="text-muted-foreground">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-1 text-primary font-medium hover:underline"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
