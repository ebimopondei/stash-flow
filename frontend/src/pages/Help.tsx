import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { UserSidebar } from '@/components/layout/UserSidebar';
import Faq from '@/components/faq';
import ContactSupport from '@/components/contact-support';

const Help = () => {

  return (
    <SidebarProvider>
        <div className="min-h-screen flex w-full">
            <UserSidebar />
            <main className='flex-1  p-6 bg-gray-50'>
                 <div className="max-w-6xl ">
        <div className="mb-8 flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
            <p className="text-gray-600 text-sm">Find answers or get in touch with our support team</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <Faq />

          {/* Contact Support */}
          <ContactSupport />
        </div>
      </div>
            </main>
    </div>
    </SidebarProvider>
  );
};

export default Help;