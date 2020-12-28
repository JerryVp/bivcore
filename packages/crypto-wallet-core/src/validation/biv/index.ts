import { IValidation } from '..';
const BitcoreValue = require('@sotatek-anhdao/bitcore-lib-value');

export class BivValidation implements IValidation {
  validateAddress(network: string, address: string): boolean {
    const AddressCash = BitcoreValue.Address;
    // Regular Address: try Bitcoin Cash
    return AddressCash.isValid(address, network);
  }

  validateUri(addressUri: string): boolean {
    // Check if the input is a valid uri or address
    const URICash = BitcoreValue.URI;
    // Bip21 uri
    return URICash.isValid(addressUri);
  }
}
