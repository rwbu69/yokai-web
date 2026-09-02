import { sanityClient } from './src/lib/sanity';
async function run() {
  const docs = await sanityClient.fetch('*[_type == "landingPage"]');
  console.log(JSON.stringify(docs, null, 2));
}
run().catch(console.error);
