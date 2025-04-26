import { useState } from 'react';
import { supabase } from './supabase';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, projectType, message } = formData;

    const { error } = await supabase
      .from('quotes')
      .insert([{ name, email, project_type: projectType, message }]);

    if (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    } else {
    
      const templateParams = {
        user_name: name,
        user_email: email,
        project_type: projectType,
        message: message,
      };

      try {
        await emailjs.send(
          'service_w7x991i',     
          'template_jjdziyg',   
          templateParams,
          'UdwQn1MmdirvUF1QB'        
        );
        console.log('Admin email sent!');
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', projectType: '', message: '' });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🏠 GLEN Renovate</h1>
          <nav className="space-x-6 hidden md:block">
            <a href="#services" className="hover:underline">Services</a>
            <a href="#packages" className="hover:underline">Packages</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Get a Quote</button>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Transform Your Home with Confidence</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">From kitchens to basements, GLEN Renovate delivers beautiful, lasting results that match your style and budget.</p>
          <div className="space-x-4">
            <button className="bg-red-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-red-700">Get a Free Quote</button>
            <button className="bg-white text-red-600 px-6 py-3 rounded-lg border border-red-600 hover:bg-red-50">Learn More</button>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Renovation Services</h2>
          <p className="mb-12 text-gray-600">We tailor every project to your vision, whether it's a quick update or a complete home makeover.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🏡', title: 'Kitchen Remodeling', desc: 'Upgrade your kitchen with modern finishes, fixtures, and layouts.' },
              { icon: '🛁', title: 'Bathroom Renovations', desc: 'Relax in your dream bathroom with spa-like upgrades and smart layouts.' },
              { icon: '🏚️', title: 'Basement Finishing', desc: 'Turn your unused basement into a living area, gym, or rental suite.' },
              { icon: '🏘️', title: 'Full Home Makeovers', desc: 'From floors to ceilings, we handle it all with expert design and craftsmanship.' },
              { icon: '🌿', title: 'Exterior Upgrades', desc: 'Boost your curb appeal with siding, decks, windows, and more.' },
              { icon: '🔧', title: 'Custom Projects', desc: 'Bring your unique vision to life with personalized renovation services.' }
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl shadow p-6 text-left">
                <div className="text-4xl mb-2">{icon}</div>
                <h3 className="text-xl font-semibold mb-1">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Renovation Packages</h2>
          <p className="mb-12 text-gray-600">Choose a package that fits your needs and budget. Transparent pricing and flexible plans.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Basic Refresh',
                price: '$4,999',
                features: ['Paint + Flooring', 'Basic Fixtures', 'Small Kitchen/Bath'],
              },
              {
                title: 'Advanced Makeover',
                price: '$14,999',
                features: ['Open Concept Redesign', 'Modern Kitchen', 'Smart Bathroom', 'Exterior Upgrade'],
                featured: true,
              },
              {
                title: 'Premium Transformation',
                price: '$29,999',
                features: ['Full Home Gut & Rebuild', 'Custom Design', 'Premium Materials', 'Dedicated Project Manager'],
              },
            ].map(({ title, price, features, featured }) => (
              <div key={title} className={`rounded-xl p-6 shadow-md ${featured ? 'border-2 border-red-600 bg-white' : 'bg-white'}`}>
                {featured && <div className="text-xs text-white bg-red-600 px-2 py-1 rounded-full mb-2 inline-block">Popular</div>}
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-3xl font-bold text-gray-800 mb-4">{price}</p>
                <ul className="text-left mb-4 space-y-1">
                  {features.map(f => <li key={f} className="text-gray-600">✔ {f}</li>)}
                </ul>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">Get Started</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">GLEN Renovate - Request a Quote</h2>
          {submitted ? (
            <p className="text-green-600 font-medium text-center">Thanks for reaching out! We'll contact you soon.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-xl"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-xl"
                required
              />
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-xl"
                required
              >
                <option value="">Select Project Type</option>
                <option value="kitchen">Kitchen Renovation</option>
                <option value="bathroom">Bathroom Remodel</option>
                <option value="basement">Basement Finishing</option>
                <option value="exterior">Exterior Work</option>
                <option value="full">Full Home Renovation</option>
              </select>
              <textarea
                name="message"
                placeholder="Tell us more about your project..."
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-xl"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              >
                Submit Request
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
