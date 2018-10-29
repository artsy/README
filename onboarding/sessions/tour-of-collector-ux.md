# Tour of Artsy

This session will take you through some of our key features on artsy.net and show you how to act as a collector in our **staging environment**.

There are also links to relevant code and admin interfaces where applicable.

## What can you do as a user on Artsy?
- Look around/read
  - Browse the site, read articles on our magazine
- Casually participate
  - Follow artists/artworks/categories, register for auctions
- Buy things
  - Through auctions, e-commerce, inquiries

#### Caveats about staging environment
- Data gets copied from production —> staging once a week (so, will be a week old + data created in staging during the week gets wiped)
- We only copy gravity data, meaning there can be some issues when referencing other services in staging (i.e. auctions)
- Elasticsearch indices are often out-of-date as we do not re-index in staging each week after the copy.
- Reference:
  - [db:copy:production:to_staging](https://github.com/artsy/gravity/blob/master/lib/tasks/db_copy.rake#L33-L53) 🔒 rake task

#### Set-up needed before this session
1. Find a work by a test partner that can be inquired on
2. Create a mock auction that is online-only (and update it so it ends far enough in the future)
3. Create a mock auction that is live
4. Create a mock auction that requires bidder approval
5. Find a work that can be bought via ecommerce

_Tips_:
  - Use the test card 4242 42424 4242 4242 for all transactions

### Things you can do as a user just browsing around...
1. Sign up for an account/log in (have them sign up with an artsymail account, like sarah+testing@artsymail.com)
  - Sign up modals reflect recent work to consolidate auth modals/behavior
  - Reference:
    - [User model](https://github.com/artsy/gravity/blob/master/app/models/domain/user.rb) 🔒
    - [Artsy passport (for auth)](https://github.com/artsy/artsy-passport)
    - [Documentation for modals](https://github.com/artsy/reaction/blob/master/docs/authentication.md)
    - [Administered in Torque](https://admin-staging.artsy.net/users) 🔒

2. Go through the onboarding questionnaire
  - This gives us a sense of your purpose for being on Artsy (helpful for marketing) and asks for data that will seed our recommendation algorithms
  - Reference:
    - [Onboarding code](https://github.com/artsy/reaction/tree/master/src/Components/Onboarding)

3. Browse the site, starting with the top-nav
  - **Home page**
    - Includes data that's personalized (based on a user's follow/save history), admin-curated, data-driven (based on the current most timely auctions, fairs, articles, etc.)
    - Reference:
      - [Home app code](https://github.com/artsy/force/tree/master/src/desktop/apps/home)
  - **Artworks** (aka "collect page")
    - Elasticsearch-based API returns results
    - Reference:
      - [Artwork model](https://github.com/artsy/gravity/blob/master/app/models/domain/artwork.rb) 🔒
      - [filter/artworks API](https://github.com/artsy/gravity/blob/master/app/api/v1/filter_endpoint.rb) 🔒
      - [Collect app code](https://github.com/artsy/force/tree/master/src/desktop/apps/collect2)
  - **Auctions**
    - Includes all auctions of different types (sorted by "timeliness")
      - Online-only ("Timed")
      - Online + Live ("LAI" == "Live Auction Integration", sometimes just called "Live Auctions")
      - Online + Event ("Benefit auction live event")
    - Reference:
      - [Auction (Sale) model](https://github.com/artsy/gravity/blob/master/app/models/domain/sale.rb) 🔒
      - [Auctions app code](https://github.com/artsy/force/tree/master/src/desktop/apps/auctions)
      - [Administered in Ohm](http://auctions-staging.artsy.net/) 🔒
  - **Galleries**
    - Organized by "Partner category"
    - Reference:
      - [Partner model](https://github.com/artsy/gravity/blob/master/app/models/domain/partner.rb) 🔒
      - [Galleries app code](https://github.com/artsy/force/tree/master/src/desktop/apps/galleries_institutions)
      - [Administered in Vibrations](https://admin-partners-staging.artsy.net/)
  - **Fairs**
    - Fair artworks are published a couple of weeks before the fair begins ("Fair preview")
    - Reference:
      - [Fair model](https://github.com/artsy/gravity/blob/master/app/models/domain/fair.rb) 🔒
      - [Fairs app code](https://github.com/artsy/force/tree/master/src/desktop/apps/fairs)
      - [Administered in Waves](https://admin-fairs-staging.artsy.net/) 🔒
  - **Magazine**
    - Curated by our Editorial team
    - Reference:
      - [Administered and modeled in Positron](https://github.com/artsy/positron)
      - [Articles app code](https://github.com/artsy/force/tree/master/src/desktop/apps/articles)

4. Browse individual entities
  - **Artwork page**
    - Goal of the artwork page is to give the collector information about the artwork, confidence in their buying decision
    - Reference:
      - [Artwork model](https://github.com/artsy/gravity/blob/master/app/models/domain/artwork.rb)
      - [Artwork app code](https://github.com/artsy/force/tree/master/src/desktop/apps/artwork)
  - **Artist page**
    - Recently made this page responsive. Is a top entry-point for "shopping" for an artist's work
    - Reference:
      - [Artist model](https://github.com/artsy/gravity/blob/master/app/models/domain/artist.rb) 🔒
      - [Artist app code (Force)](https://github.com/artsy/force/tree/master/src/desktop/apps/artist)
      - [Artist app code (Reaction)](https://github.com/artsy/reaction/tree/master/src/Apps/Artist)
  - **Auction page**
    - Reference:
      - [filter/sale_artworks API](https://github.com/artsy/gravity/blob/master/app/api/v1/filter_endpoint.rb) 🔒
      - [Auction app code](https://github.com/artsy/force/tree/master/src/desktop/apps/auction)
  - **Gallery profile page**
    - URL is not namespaced by "/gallery" for marketing reasons, but takes the form https://staging.artsy.net/pace-slash-macgill-gallery
    - Reference:
      - [App code](https://github.com/artsy/force/tree/master/src/desktop/apps/partner)
  - **Article page**
    - Articles can include text, images, and video.
    - Curations are used for content, often sponsored, that require a highly custom and specified display.
    - Reference:
      - [App code](https://github.com/artsy/force/tree/master/src/desktop/apps/article)
  - **Fair microsite**
    - Vanity URL since it will be shared in marketing material
    - Reference:
      - [App code](https://github.com/artsy/force/tree/master/src/desktop/apps/fair)

5. Follow an artist/gallery/category from the UI
  - Notice that these now show up in your user settings (and will continue to power recs, similarity, etc.)
  - Reference:
    - [FollowArtist model](https://github.com/artsy/gravity/blob/master/app/models/domain/follow_artist.rb) 🔒

6. Save an artwork for later
  - Reference:
    - [CollectedArtwork model](https://github.com/artsy/gravity/blob/master/app/models/domain/collected_artwork.rb) 🔒

### Ways that you can buy art as an Artsy user...
1. Inquire on an artwork that is owned by a known test account (i.e. Invoicing Demo Partner)
  - Inquiries are sent to gallery contacts that are subscribed to receive inquiry messages
  - Galleries can respond via Conversations (in CMS) or email
  - Collectors can respond via Messaging (in the iOS app) or email
  - Inquiries are a key metric for our teams as it can indicate an intent to buy (and eventually lead to a purchase)
  - Reference:
    - [Inquiry model](https://github.com/artsy/gravity/blob/master/app/models/domain/inquiry_request.rb) 🔒
    - [Conversation model in Impulse](https://github.com/artsy/impulse/blob/master/app/models/conversation.rb) 🔒
    - [Message model in Radiation](https://github.com/artsy/radiation/blob/master/app/models/message.rb) 🔒
    - [Conversations app in CMS](https://github.com/artsy/volt/tree/master/app/views/conversations) 🔒

2. Respond to an inquiry with an invoice, and pay for it
  - An inquiry may have an invoice attached from a gallery
  - Invoices are created by partners (with any number of line items)
  - Collectors pay invoices via a separate interface
  - Reference:
    - [Invoice model](https://github.com/artsy/lewitt-api/blob/master/app/models/invoice.rb)
    - [Invoicing UI (for collectors)](https://github.com/artsy/lewitt-web-public)

3. Register for an auction
  - Some auctions require that you are _approved_ by an admin before you are allowed to bid
  - Reference:
    - [Bidder model](https://github.com/artsy/gravity/blob/master/app/models/domain/bidder.rb) 🔒

4. Bid in an online-only auction
  - This creates a max bid (meaning, you agree to pay _up to_ that amount for the work).
  - When the auction ends, the highest bidder wins
  - Reference:
    - [BidderPosition model](https://github.com/artsy/gravity/blob/master/app/models/domain/bidder_position.rb) 🔒

5. Bid in a live auction (and pull up operator to show the live auction process)
  - The operator keeps track of progress in the room
  - You can jump in at any time to bid that _exact_ amount
  - Reference:
    - [Live bidding in Causality (model/engine)](https://github.com/artsy/causality) 🔒
    - [Live bidding from Prediction (operator/bidder UI)](https://github.com/artsy/prediction) 🔒

6. Buy a work through the e-commerce checkout flow
  - When you buy through e-commerce, the artwork is immediately marked as Sold. Partners approve your order at which point you are charged for it.
  - Reference:
    - [Order model in Exchange](https://github.com/artsy/exchange/blob/master/app/models/order.rb)
    - [Order app (in Force)](https://github.com/artsy/force/tree/master/src/desktop/apps/order2)
    - [Order app (in Reaction)](https://github.com/artsy/reaction/tree/master/src/Apps/Order)
