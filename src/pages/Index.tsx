
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/AnimatedButton';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold tracking-tight text-foreground text-glow mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Welcome to Pickcreator
        </motion.h1>
        
        <motion.p 
          className="text-xl text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Your creative journey starts here
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/auth">
            <AnimatedButton variant="shimmer" className="px-8 py-6 text-lg">
              <span className="flex items-center gap-2">
                Get Started <ArrowRight size={20} />
              </span>
            </AnimatedButton>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
