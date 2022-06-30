/**
 * We're creating our own module resolver for jest because it is having a
 * very hard time finding our monorepo packages.  When we import a `@paste`
 * package we use our own module resolution, otherwise we use the default
 * node one.
 *
 * @param {string} package
 * @param {*} details
 */
 function customResolver(pack, details) {
    if (
      pack.includes('@twilio-paste/') &&
      pack.includes('icons') &&
      pack.includes('esm')
    ) {
      const [start, end] = pack.split('esm');
      const newPackage = `${start}cjs${end}`;
  
      return details.defaultResolver(newPackage, details);
    }
  
    return details.defaultResolver(pack, details);
  }
  
  module.exports = customResolver;