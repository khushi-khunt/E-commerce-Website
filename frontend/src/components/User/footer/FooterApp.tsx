import visa from '@/assets/images/visa.png'
import appstore from '@/assets/images/appstore.jpg'
import googleplay from '@/assets/images/googleplay.jpg'
export const FooterApp = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Install App</h3>

      <p className="text-sm text-muted-foreground">From App Store or Google Play</p>

      <div className="flex gap-3">
        <img
          src={appstore}
          alt="App Store"
          className="w-32 rounded-lg border border-gray-300 hover:shadow-md transition"
        />
        <img
          src={googleplay}
          alt="Google Play"
          className="w-32 rounded-lg border border-gray-300 hover:shadow-md transition"
        />
      </div>

      <p className="text-sm text-muted-foreground">Secured Payment Gateways</p>

      <div className="flex gap-3">
        <img
          src={visa}
          alt="Visa Payment"
          className="w-50 object-contain border border-gray-300 rounded-md"
        />
        {/* Add more logos here if needed */}
      </div>
    </div>

  )
}
