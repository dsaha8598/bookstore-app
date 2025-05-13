import React from "react";

const Home = () => {
  return (
    <div className="bg-[#f3f7fa] text-[#0f172a] font-['Inter',sans-serif]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#f3f7fa] shadow-sm flex items-center justify-between px-6 sm:px-10 py-4 max-w-7xl mx-auto">
        <div className="text-[20px] font-semibold leading-[24px]">BookNest</div>
        <nav className="hidden md:flex space-x-8 text-[14px] font-normal text-[#475569]">
          <a className="hover:text-[#0f172a]" href="#dashboard">Dashboard</a>
          <a className="hover:text-[#0f172a]" href="#inventory">Inventory</a>
          <a className="hover:text-[#0f172a]" href="#orders">Orders</a>
          <a className="hover:text-[#0f172a]" href="#customers">Customers</a>
          <a className="hover:text-[#0f172a]" href="#reports">Reports</a>
        </nav>
        <button className="hidden md:block bg-[#0f172a] text-white text-[14px] font-semibold rounded-full px-6 py-2 hover:bg-[#1e293b] transition">
          Login
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Hero Section */}
        <section id="dashboard" className="pt-6 md:pt-12 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          <div className="flex-1 max-w-xl">
            <p className="text-[12px] font-semibold text-[#475569] uppercase mb-2">Welcome Back,</p>
            <h1 className="text-[28px] sm:text-[36px] font-extrabold leading-[40px] sm:leading-[48px] mb-4">
              Manage Your Bookstore<br />Efficiently with BookNest
            </h1>
            <button className="bg-[#0f172a] text-white text-[14px] font-semibold rounded-full px-6 py-2 hover:bg-[#1e293b] transition">
              View Inventory
            </button>
            <p className="text-[12px] text-[#475569] mt-2 max-w-[280px]">Trusted by hundreds of bookstore owners worldwide</p>
          </div>
          <div className="flex-1 relative max-w-[320px] sm:max-w-[400px]">
            <img className="rounded-lg shadow-lg" src="https://storage.googleapis.com/a1aa/image/11688dd4-549b-4805-9ce5-168ba651c47c.jpg" alt="Hero" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-full px-4 py-2 flex items-center space-x-2 shadow-md max-w-[280px]">
              <i className="fas fa-book text-[#0f172a] text-lg"></i>
              <span className="text-[12px] text-[#475569] font-semibold">Trusted by 500+ store owners</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="reports" className="mt-20 bg-[#0f172a] text-white py-8 px-6 rounded-lg flex flex-wrap justify-around gap-6 text-center">
          {[
            ["12K+", "Books in Inventory"],
            ["1.5K+", "Orders Processed"],
            ["3.2K+", "Customers Served"],
            ["98%", "Customer Satisfaction"],
          ].map(([value, label], i) => (
            <div key={i}>
              <p className="text-[28px] font-extrabold">{value}</p>
              <p className="text-[14px] mt-1">{label}</p>
            </div>
          ))}
        </section>

        {/* Tools Section */}
        <section id="inventory" className="mt-20 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="flex flex-col space-y-4 md:w-1/2">
            <img className="rounded-lg shadow-md" src="https://storage.googleapis.com/a1aa/image/555c45da-12be-481c-d16e-c877c4c4280f.jpg" alt="Inventory" />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-[20px] font-extrabold mb-4">Powerful Tools to Manage Your Store</h2>
            <p className="text-[14px] text-[#475569] mb-6 max-w-md">
              Our platform offers inventory tracking, order management, customer insights, and sales reports to help you run your bookstore smoothly and grow your business.
            </p>
            <button className="bg-[#0f172a] text-white text-[14px] font-semibold rounded-full px-6 py-2 hover:bg-[#1e293b] transition">
              Explore Features
            </button>
          </div>
        </section>

        {/* Partners */}
        <section className="mt-20 flex justify-center items-center flex-wrap gap-6">
          {[
            "4c3d93fa-7754-407b-1be1-d52d9e7d3be7",
            "4e1251ab-c67f-44c0-1591-b1f1a90941e6",
            "14cc3bc5-67c4-4099-c689-109fe407b626",
            "dd85ad9b-d6c6-4068-4295-d4557c36f311",
            "c52b49d3-7820-45a8-7e37-18c266ac41e9"
          ].map((id, i) => (
            <img key={i} className="h-10" src={`https://storage.googleapis.com/a1aa/image/${id}.jpg`} alt={`Partner ${i + 1}`} />
          ))}
        </section>

        {/* Services */}
        <section id="orders" className="mt-20">
          <h3 className="text-[20px] font-extrabold mb-8">Our Key Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              ["Inventory Management", "fas fa-book", "Keep track of your books stock and update availability in real-time."],
              ["Order Management", "fas fa-shopping-cart", "Process and track customer orders efficiently from start to finish."],
              ["Customer Management", "fas fa-users", "Manage customer information and build lasting relationships."],
              ["Sales Reporting", "fas fa-chart-line", "Analyze sales data to make informed business decisions."]
            ].map(([title, icon, desc], i) => (
              <div key={i} className={`p-6 rounded-lg flex space-x-4 ${i % 2 === 0 ? "bg-white shadow-sm" : "bg-[#e9f0ff]"}`}>
                <div className="bg-[#0f172a] text-white rounded p-3"><i className={`${icon} text-xl`}></i></div>
                <div>
                  <h4 className="text-[16px] font-semibold mb-1">{title}</h4>
                  <p className="text-[14px] text-[#475569]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="customers" className="mt-20 bg-[#0f172a] text-white rounded-lg px-6 py-12 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-[24px] font-bold mb-4">Why Choose BookNest?</h2>
            <p className="text-[14px] leading-[20px] mb-6">We are committed to helping bookstore owners manage their daily operations with ease. Our tools are intuitive, our support is top-notch, and our platform is continuously evolving to meet your needs.</p>
            <ul className="list-disc list-inside text-[14px] space-y-1">
              <li>Easy to use interface</li>
              <li>Reliable customer support</li>
              <li>Affordable pricing</li>
              <li>Data-driven insights</li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <img className="rounded-lg shadow-lg" src="https://storage.googleapis.com/a1aa/image/5c52b81b-cc79-4cb0-9c3f-859c2f2f0e1a.jpg" alt="Why Choose Us" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
