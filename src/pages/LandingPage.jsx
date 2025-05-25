import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  BarChart2,
  Layers,
  PieChart,
  Package,
  Users,
  Sparkle,
} from "lucide-react";


// Unified Button Component
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'font-medium rounded transition-colors duration-200 focus:outline-none';

  const variants = {
    primary: 'bg-[#0e6bb3] text-white hover:bg-[#0d5ea0] disabled:bg-gray-400',
    secondary: 'bg-[#ecf2f6] text-[#096289] hover:bg-[#dde8f0] disabled:bg-gray-100',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400',
  };

  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={buttonClasses} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

// Unified Card Component
const Card = ({ title, description, className = '', children }) => {
  return (
    <div className={`bg-[#e1f2ff] rounded-[30px] p-8 ${className}`}>
      {title && (
        <h3 className="text-[20px] font-normal font-['Amiri'] text-center text-[#312e2e] mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-[20px] font-normal font-['Amiri'] text-center text-[#312e2e] leading-[35px]">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

// Header
const Header = () => {

const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between py-4 px-6 md:px-24">
      <div className="text-[32px] font-normal text-[#149eb2] font-['Geologica']">
  <Link to="/" className="flex items-left">
    <img src="images/book-nest-logo.png" alt="Logo" className="w-60 h-30 object-contain mr-1 -mt-2 -ml-2" />
  </Link>
</div>

      <nav className="hidden md:flex items-center space-x-8">
        {['dashboard', 'inventory', 'orders', 'customers', 'reports'].map(route => (
          <Link key={route} to={`/${route}`} className="text-[20px] font-normal text-black font-['Ibarra_Real_Nova'] capitalize">
            {route}
          </Link>
        ))}
      </nav>
      <Button 
        variant="primary" 
        className="rounded-[9px] h-[44px] w-[124px] text-[20px] font-['Hind_Vadodara'] font-semibold"
        onClick={()=>navigate('/login')}
      >
        Log in
      </Button>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="text-center px-4 py-12 md:py-16">
      <h1 className="text-[64px] font-semibold font-['Hind_Vadodara'] leading-[95px] mb-4">
        <span className="text-black">Manage Your </span>
        <span className="text-[#0e6bb3]">Book Store</span><br />
        <span className="text-black">With BOOKnest</span>
      </h1>
      <p className="text-[20px] font-normal text-[#5a5454] font-['Ibarra_Real_Nova'] mb-8">
        Makes book store managing efficient
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
        <Button variant="primary" className="rounded-[15px] h-[46px] w-[142px] text-[20px] font-['Hind_Vadodara'] font-semibold" onClick={()=>navigate('/register')}>
          Get it Now
        </Button>
        <Button variant="secondary" className="rounded-[15px] h-[46px] w-[142px] text-[20px] font-['Hind_Vadodara'] font-semibold">
          View Demo
        </Button>
      </div>
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <img src="/images/img_book_store_bg_3_3.png" alt="Bookstore shelves" className="w-[464px] h-[256px] object-cover" />
        <div className="bg-[#edf8f9] rounded-[42px] h-[84px] w-[262px] flex items-center px-4">
          <div className="relative">
            <img src="/images/img_book_store_bg_4_3.png" alt="User1" className="w-[56px] h-[52px] rounded-[26px] absolute left-0" />
            <img src="/images/img_book_store_bg_4_3.png" alt="User2" className="w-[56px] h-[52px] rounded-[26px] absolute left-7" />
          </div>
          <div className="ml-24 text-center">
            <p className="text-[13px] font-semibold font-['Hind_Vadodara'] whitespace-pre-line">
              22K+ {"\n"} Satisfied Customer
            </p>
          </div>
        </div>
        <img src="/images/img_book_store_bg_3_3.png" alt="Bookstore shelves" className="w-[464px] h-[256px] object-cover" />
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      console.log(`Subscribing email: ${email}`);
      setEmail('');
      alert('Thank you for subscribing to our newsletter!');
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <footer className="bg-[#02233d] text-white py-10 px-6 md:px-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-[20px] font-normal font-['Geologica'] mb-2">BOOKnest</h2>
          <p className="text-[14px] font-normal font-['Geologica']">Book store managing platform</p>
        </div>
        <div>
          <h3 className="text-[16px] font-normal font-['Geologica'] mb-4">Contact Us</h3>
          <a href="mailto:customer.support@booksnest.com" className="text-[14px] font-normal font-['Geologica'] underline block mb-2">
            customer.support@booksnest.com
          </a>
          <p className="text-[14px] font-normal font-['Geologica']">(254) 1478965 23365</p>
        </div>
        <div>
          <h3 className="text-[16px] font-normal font-['Geologica'] mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="bg-white w-[46px] h-[30px] flex items-center justify-center border border-black">
              <img src="/images/img_icon.svg" alt="Facebook" className="w-[21px] h-[25px]" />
            </a>
            <a href="https://twitter.com" className="bg-white w-[39px] h-[32px] flex items-center justify-center">
              <img src="/images/img_icon_20x35.svg" alt="Twitter" className="w-[20px] h-[35px]" />
            </a>
            <a href="https://instagram.com" className="bg-[#fbfbfb] w-[34px] h-[32px] flex items-center justify-center">
              <img src="/images/img_icon_26x28.svg" alt="Instagram" className="w-[26px] h-[28px]" />
            </a>
          </div>
        </div>
        <div className="md:col-span-3 mt-6">
          <h3 className="text-[16px] font-normal font-['Geologica'] mb-4">Subscribe To Our News Letter</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white rounded-[16px] h-[33px] w-full sm:w-[260px] flex items-center px-4">
              <input
                type="email"
                placeholder="Enter your email here.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-[13px] text-[#807e7e] font-['Geologica'] outline-none"
              />
            </div>
            <button 
              onClick={handleSubscribe}
              className="bg-[#2075ba] rounded-[10px] h-[29px] w-[77px] text-[13px] font-normal font-['Geologica'] text-white"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const StatsSection = () => {
  return (
    <section className="bg-[#0e6bb3] text-white rounded-[30px] py-8 px-4 my-12 mx-6 md:mx-16">
      <h2 className="text-[20px] font-normal font-['IM_FELL_Double_Pica'] text-center mb-4">
        Trusted By Thousands Of Book Owners World Wide
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <p className="text-[36px] font-bold font-['Golos_Text'] mb-2">12K+</p>
          <p className="text-[13px] font-bold font-['Golos_Text']">Books Sold</p>
        </div>
        <div>
          <p className="text-[36px] font-bold font-['Golos_Text'] mb-2">22K+</p>
          <p className="text-[13px] font-bold font-['Golos_Text']">Happy Customers</p>
        </div>
        <div>
          <p className="text-[36px] font-bold font-['Golos_Text'] mb-2">150+</p>
          <p className="text-[13px] font-bold font-['Golos_Text']">Stores Using Us</p>
        </div>
        <div>
          <p className="text-[36px] font-bold font-['Golos_Text'] mb-2">5+</p>
          <p className="text-[13px] font-bold font-['Golos_Text']">Years of Service</p>
        </div>
      </div>
    </section>
  );
};


const FeaturesSection = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
      <section className="space-y-10 md:col-span-2 grid grid-cols-2 gap-10">
        <div className="bg-[#D9E9FB] rounded-3xl p-8 max-w-xs">
          <BarChart2 className="mx-auto mb-2 text-sky-500" />
          <h3 className="text-center text-gray-900 font-sans font-semibold text-lg leading-6">
            Track Book Sales
          </h3>
          <p className="text-center text-xs leading-5 mt-3 font-serif text-gray-900">
            Monitor daily sales, identify best-selling titles, and analyze performance
          </p>
        </div>
        <div className="max-w-xs">
          <Layers className="mx-auto mb-2 text-sky-500" />
          <h3 className="text-center text-gray-900 font-sans font-normal text-lg leading-6">
            Manage Inventory
          </h3>
          <p className="text-center text-xs leading-5 mt-3 font-serif text-gray-900">
            Easily add, update, and monitor your book stock in real-time.
          </p>
        </div>
        <div className="max-w-xs">
          <PieChart className="mx-auto mb-2 text-sky-500" />
          <h3 className="text-center text-gray-900 font-sans font-semibold text-lg leading-6">
            View Sales Insights
          </h3>
          <p className="text-center text-xs leading-5 mt-3 font-serif text-gray-900">
            Get valuable reports and dashboards to help grow your business
          </p>
        </div>
        <div className="max-w-xs">
          <Package className="mx-auto mb-2 text-sky-500" />
          <h3 className="text-center text-gray-900 font-sans font-semibold text-lg leading-6">
            Handle Pickup Orders
          </h3>
          <p className="text-center text-xs leading-5 mt-3 font-serif text-gray-900">
            Let customers place pickup orders online and streamline fulfillment.
          </p>
        </div>
        <div className="max-w-xs col-span-2 mx-auto">
          <Users className="mx-auto mb-2 text-sky-500" />
          <h3 className="text-center text-gray-900 font-sans font-semibold text-lg leading-6">
            Employee Management
          </h3>
          <p className="text-center text-xs leading-5 mt-3 font-serif text-gray-900">
            Assign roles, track attendance, and oversee staff activities.
          </p>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center text-center md:text-left md:items-start md:pl-10">
        <span className="bg-[#D9E9FB] text-xs text-gray-900 font-sans rounded-full px-4 py-1 mb-4 inline-block">
          Feature
        </span>
        <h2 className="text-black font-serif text-[40px] leading-[48px] font-normal mb-6">
          Explore Our <br />
          Key Feature
        </h2>
        <p className="text-gray-500 font-serif text-lg leading-7 max-w-md">
          Our key feature will help you in managing your bookstore the smart way
          with BookSmart – simple, powerful, and built for bookstore success.
        </p>
        <Sparkle className="text-[#D9E9FB] mt-6 hidden md:block" size={32} />
      </section>
    </main>
  );
};


const AboutSection = () => {
  return (
      <div class="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-20">
   <div class="max-w-xl md:max-w-md">
    <span class="inline-block bg-blue-100 text-black text-xs font-normal rounded-full px-5 py-2 mb-4">
     About Us
    </span>
    <h1 class="text-4xl font-serif font-normal leading-tight text-black mb-6">
     What
     <span>
      is
     </span>
     <br/>
     <span class="text-blue-700 font-semibold">
      BOOKnest
     </span>
     <span>
      ?
     </span>
    </h1>
    <p class="text-gray-600 text-base font-normal leading-relaxed">
     BookSmart is an all-in-one platform designed for bookstore owners to efficiently manage their stores. Whether you're running a small neighborhood shop or a growing book business, BookSmart simplifies your day-to-day operations so you can focus on what matters most—your customers and your books.
    </p>
   </div>
   <div class="flex-shrink-0 rounded-3xl bg-blue-100 p-6 md:p-0">
    <img alt="Screenshot of DIGIscribe app interface with sidebar menu, search bar, and digital writing templates displayed" class="rounded-3xl max-w-full h-auto" height="400" src="/images/home 5.jpg" width="600"/>
   </div>
  </div>
  );
}

// Combined Component
const LandingPage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <StatsSection/>
      <AboutSection/>
      <FeaturesSection/>
      <Footer />
    </div>
  );
};

export default LandingPage;
