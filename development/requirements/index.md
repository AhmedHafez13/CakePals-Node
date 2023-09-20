# NodeJS Challenge

## 🥮 Basic Task

CakePals is an app where people can sell home-baked cakes and pies to each other. There are Bakers who can register on CakePals and list their products for sale. App users typically look for available offerings nearby, create a member account (if needed) and place a baking order. Bakers receive orders, bake and hand over ready products at the agreed collection time. Refer to the Appendix for an example.

Your task is to create a backend API application for CakePals. There are three types of users: Guests (unauthenticated requests), Members and Bakers. In your data model, in addition to “common” data fields (e.g. identifiers), please consider that:

- Baker’s profile includes location, rating, and collection time range.
- Products include baking time and type (e.g. fruit cake, meat pie).
- Order information includes payment method and collection time.

Here are the features that we ask you to implement:

- New account registration (either as a Member or as a Baker).
- Bakers and Members can authenticate.
- Bakers can add new products for selling and then edit or remove them.
- All users can list available products and filter them by location and type.
- All users can see a baker’s profile (with a rating).
- Members can see available collection times and place orders. For collection time availability, assume that each baker can bake only one cake at a time (see an example in the Appendix).
- Bakers can see their orders, accept, reject and fulfil them.
- Customers can rate their fulfilled orders. Orders rates form the overall baker’s rating.

## ❗Notes

- **NO FRONT END IS NEEDED.** You do not need to write any front-end application, only the backend.

- **NO INTEGRATION IS NEEDED.** You do not need to provide integration with any external systems. Feel
free to mock any functionality outside of your application, even databases.

- **BONUS FEATURES.** Going the extra mile is much appreciated and considered a big bonus. For example, you can consider adding a database, caching, setting up a CI/CD pipeline or even making an actual deployment to the cloud.

- If you wish to share your thoughts on the design decisions, implementation challenges, next steps or other topics, feel free to put your thoughts in a free form in the readme file. This can help you share ideas that would be too costly to express in the code but that you still would like us to consider. The code of the solution is fully yours. This is not an app you develop for us but for yourself. It will be part of your portfolio that you can demonstrate to us and others. The more effort you decide to put into this application (e.g. by implementing bonus features), the stronger your portfolio will be and the better we’ll be able to see your skills in action! Good luck!

## Appendix. Example of CakePals usage

This example does not mean you must implement any UI to replicate it. It only illustrates use cases and should give some indications about how the business logic maps to the API calls.

Scenario:

- Alice loves baking and wants to sell her cherry cakes and kidney pies to others. Alice created a baker profile at CakePals and listed her two products. A kidney pie takes 3 hours to bake, and a cherry pie needs 2 hours.
- Assume that at some day, 10:00 in the morning, Bob, Carol and Dan discovered CakePals. Bob decides to enjoy a kidney pie and uses CakePals to find available kidney pies in a 2km radius. He finds Alice's offering, registers himself as a member and orders a kidney pie with the desired collection time of 14:00.
- Carol is a CakePals member and wants a cherry pie for lunch. Normally, the earliest collection time would be 12:00 due to baking time, but Alice is already busy with the kidney pie from 11:00 until 14:00 (we assume only one cake can be baked at the moment). Therefore earliest collection time for Carol is 16:00, and she decides to order a cake for 19:00 and enjoy it at dinner.
- Dan searches for berry cakes and finds Alice's offering. He registers as a member and puts an order for 16:30 collection time.
- At the end of the day, Bob, Carol and Dan rated their orders with 5 stars (of 5), improving Alice's baker rating.
