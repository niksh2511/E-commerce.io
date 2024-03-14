function CheckOutMode({ handleClose, subtotal }) {
  // Random values for shipping and tax
  const shippingCharges = 10;
  const taxPercentage = 5;
  const tax = (subtotal * taxPercentage) / 100;

  // Function to format currency
  const formatCurrency = (value) => {
    return (
      <>
        <span>${Math.round(value)}</span>
      </>
    );
  };

  const handlePrintInvoice = () => {
    window.print()
    handleClose()
  }

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Invoice
                  </h3>
                  <div classN ame="mt-2">
                    <p className="text-sm text-gray-500">
                      Subtotal: {formatCurrency(subtotal)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Shipping Charges: {formatCurrency(shippingCharges)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Tax ({taxPercentage}%): {formatCurrency(tax)}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      Total: {formatCurrency(subtotal + shippingCharges + tax)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto mr-3"
                onClick={() => handlePrintInvoice()}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutMode;
