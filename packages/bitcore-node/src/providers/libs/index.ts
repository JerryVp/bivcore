class LibProvider {
  libs = {
    BIV: {
      lib: require('@sotatek-anhdao/bitcore-lib-value'),
      p2p: require('@sotatek-anhdao/bitcore-p2p-value')
    }
  };

  register(chain: string, lib: string, p2p: string) {
    this.libs[chain] = { lib: require(lib), p2p: require(p2p) };
  }

  get(chain) {
    return this.libs[chain];
  }
}

export const Libs = new LibProvider();
