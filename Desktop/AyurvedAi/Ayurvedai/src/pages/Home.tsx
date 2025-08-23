import { Link } from 'react-router-dom';
import HomeImage from './Home.jpeg';
import { FaLeaf, FaHeartbeat, FaBookMedical } from 'react-icons/fa';

const Home = () => {
  return (
    <div className='bg-gradient-to-br from-emerald-50 via-white to-green-50 min-h-screen'>
      <div className='container mx-auto px-4'>
        {/* Hero Section */}
        <section className='py-20 md:py-28'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-8'>
              <div className='space-y-4'>
                <div className='inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full'>
                  <span className='text-emerald-700 font-medium text-sm'>
                    🌿 AI-Powered Ayurvedic Care
                  </span>
                </div>
                <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight'>
                  <span className='text-gray-900'>Your Personal</span>
                  <br />
                  <span className='bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent'>
                    AyurvedAI
                  </span>
                  <br />
                  <span className='text-gray-700 text-3xl md:text-4xl'>Health Assistant</span>
                </h1>
                <p className='text-xl text-gray-600 leading-relaxed max-w-xl'>
                  Experience ancient Ayurvedic wisdom enhanced by modern AI technology. Get
                  personalized health recommendations based on your unique constitution and
                  symptoms.
                </p>
              </div>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Link to='/chat'>
                  <button className='group bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl px-8 py-4 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center'>
                    Start Free Consultation
                    <svg
                      className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                      />
                    </svg>
                  </button>
                </Link>
                <Link to='/remedies'>
                  <button className='border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl px-8 py-4 font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1'>
                    Explore Remedies
                  </button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className='flex items-center space-x-6 pt-6'>
                <div className='flex items-center space-x-2'>
                  <div className='flex -space-x-2'>
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className='w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold'
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className='text-gray-600'>50,000+ users trust us</span>
                </div>
                <div className='flex items-center space-x-1'>
                  {[1, 2, 3, 4, 5].map(i => (
                    <svg
                      key={i}
                      className='w-5 h-5 text-yellow-400'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  ))}
                  <span className='text-gray-600 ml-2'>4.9/5 rating</span>
                </div>
              </div>
            </div>

            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-emerald-200 to-green-200 rounded-3xl transform rotate-6 scale-105 opacity-20'></div>
              <img
                src={HomeImage}
                alt='Ayurvedic health illustration'
                className='relative rounded-2xl shadow-2xl object-cover w-full h-96 lg:h-[500px]'
              />
              <div className='absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg'>
                <div className='flex items-center space-x-3'>
                  <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
                  <span className='text-sm font-medium text-gray-700'>AI Available 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='py-20'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <div className='inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-4'>
                <span className='text-emerald-700 font-semibold text-sm'>How It Works</span>
              </div>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
                Simple. <span className='text-emerald-600'>Personalized.</span> Effective.
              </h2>
              <div className='w-20 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full'></div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {[
                {
                  icon: <FaLeaf className='text-3xl' />,
                  title: 'Share Your Symptoms',
                  description:
                    "Tell our AI chatbot about your health concerns and symptoms in simple language. We make it easy to describe how you're feeling.",
                  color: 'from-emerald-500 to-green-500',
                },
                {
                  icon: <FaHeartbeat className='text-3xl' />,
                  title: 'Get Ayurvedic Analysis',
                  description:
                    'Our AI analyzes your symptoms according to Ayurvedic principles and identifies your unique dosha imbalances.',
                  color: 'from-green-500 to-teal-500',
                },
                {
                  icon: <FaBookMedical className='text-3xl' />,
                  title: 'Receive Recommendations',
                  description:
                    'Get personalized remedy suggestions, lifestyle modifications, and dietary advice tailored to your specific needs.',
                  color: 'from-teal-500 to-emerald-500',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className='group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2'
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  <div className='relative'>
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto text-white shadow-lg`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className='text-2xl font-bold text-gray-900 mb-4 text-center'>
                      {feature.title}
                    </h3>
                    <p className='text-gray-600 text-center leading-relaxed'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className='py-20 bg-gradient-to-r from-emerald-900 to-green-900 rounded-3xl my-20 relative overflow-hidden'>
          <div className='absolute inset-0 bg-black opacity-10'></div>
          <div className='absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48 opacity-5'></div>
          <div className='absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -ml-32 -mb-32 opacity-5'></div>

          <div className='relative container mx-auto px-4'>
            <div className='text-center mb-16'>
              <div className='inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4'>
                <span className='text-white font-semibold text-sm'>✨ Success Stories</span>
              </div>
              <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>What Our Users Say</h2>
              <div className='w-20 h-1 bg-white mx-auto rounded-full opacity-50'></div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto'>
              {[
                {
                  text: "AyurvedAI helped me understand my digestive issues from an Ayurvedic perspective and suggested simple remedies that actually worked! I've been following the dietary recommendations for a month now and feel much more balanced.",
                  name: 'Priya S.',
                  type: 'Vata-Pitta Type',
                },
                {
                  text: "I've been struggling with sleep issues for years. The personalized recommendations from AyurvedAI have made a significant difference in my sleep quality. The herbal remedies and bedtime routine suggestions were game-changers.",
                  name: 'Rahul M.',
                  type: 'Kapha Type',
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className='bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20'
                >
                  <div className='flex mb-4'>
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg
                        key={star}
                        className='w-5 h-5 text-yellow-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    ))}
                  </div>
                  <p className='text-white/90 mb-6 text-lg leading-relaxed italic'>
                    "{testimonial.text}"
                  </p>
                  <div className='flex items-center'>
                    <div className='w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-lg'>
                      {testimonial.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </div>
                    <div className='ml-4'>
                      <p className='font-bold text-white text-lg'>{testimonial.name}</p>
                      <p className='text-white/70'>{testimonial.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-20 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-3xl my-20 relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32 opacity-10'></div>
          <div className='absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24 opacity-10'></div>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full opacity-5'></div>

          <div className='relative container mx-auto px-4 text-center'>
            <div className='max-w-4xl mx-auto space-y-8'>
              <h2 className='text-4xl md:text-5xl font-bold mb-6'>
                Ready to Transform Your Health?
              </h2>
              <div className='w-20 h-1 bg-white mx-auto rounded-full opacity-50'></div>
              <p className='text-xl mb-10 leading-relaxed opacity-90'>
                Join thousands of users who have discovered the power of personalized Ayurvedic
                care. Start your journey to optimal health with AyurvedAI today.
              </p>
              <div className='flex flex-col sm:flex-row gap-6 justify-center'>
                <Link to='/signup'>
                  <button className='bg-white text-emerald-600 hover:bg-gray-50 rounded-xl px-8 py-4 font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:-translate-y-1'>
                    Get Started Free
                  </button>
                </Link>
                <Link to='/login'>
                  <button className='border-2 border-white text-white hover:bg-white hover:text-emerald-600 rounded-xl px-8 py-4 font-bold text-lg transform transition-all duration-300 hover:scale-105 hover:-translate-y-1'>
                    Sign In
                  </button>
                </Link>
              </div>

              {/* Features list */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-2xl mx-auto'>
                {['Free Consultation', 'Instant Results', 'Expert Guidance', '24/7 Support'].map(
                  (feature, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-center space-x-2 text-white/80'
                    >
                      <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='text-sm font-medium'>{feature}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
