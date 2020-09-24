## Approach and Process

1. What in my process and approach to this project would we do differently next time?

  * Communicate more and be clear on the call to action before starting on a task.
  * Before adding any features, be sure of solving the edge cases before deploying the feature to the app.

2. What in my process and approach to this project went well that we would repeat next time?

  * We had strong user stories as well as a clearly defined problem to solve. We were direct in our approach in defining the functions required in our MVP to solve the problem.
  * We planned out our workflow clearly via drawing an ERD diagram , creating wireframes for each of the routes and also think through the set up of the app before starting to code.

## Code and Code Design

1. What in my code and program design in the project would I do differently next time?

  * Leveraging more on React Lifecycle methods such as componentDidUpdate or UseEffects to re-render rather than using hard refresh to force a re-render.
```javascript
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const body = { listing_name, listing_details, image_url, itemId, quantity, price }
      const response = await fetch("/listings/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = `/shop/${id}`
      console.log(response);
    } catch (err) {
      throw new Error("ERRORRRR")
    }
  }
```


2. What in my code and program design in the project went well? Is there anything I would do the same next time?

  * Having proper indentation, not only makes the code neater but also easier to read and edit upon if any error occurs.

```javascript
if(loggedIn) {
        return (
              <nav className="site-header sticky-top py-1 bg-dark">
                <div className="container d-flex flex-column flex-md-row justify-content-between text-light">
                  <h3>Welcome, {Cookies.get('username')}</h3>
                  <Link to='/' className="py-2 d-none d-md-inline-block text-light" id="link1">Home</Link>
                  <Link to='/shopByCategory' className="py-2 d-none d-md-inline-block text-light"  id="link2" >Shop By Category</Link>



                   {sellerId ? <Link to ={`/inbox/${sellerId}`} className="py-2 d-none d-md-inline-block text-light"  id="link3">Inbox</Link> : null }

                  {userId ? <Link to ={`/inbox/user/${userId}`} className="py-2 d-none d-md-inline-block text-light"  id="link3">Inbox</Link>: null}


                  <Link to ='/favourites' className="py-2 d-none d-md-inline-block text-light" id="link4">Your favourites</Link>
                  <Logout />
                </div>
              </nav>
    )
```


## WDI Unit 3 Post Mortem

1. What habits did I use during this unit that helped me?

  * Initial planning via ERD diagrams, wireframes, user stories etc.
  * Meeting up with group mates to clear up confusions or miscommunications
  * Committing to Git regularly and also working on separate to ensure I am able to restore my data in case my app breaks
  * Doing one functionality at a time and take ample rest breaks.


2. What habits did I have during this unit that I can improve on?

  * Consider more edge cases when adding new features
  * Relying on brute force approach when functions don't work as expected
  * Talk to more people and get their feedback

3. How is the overall level of the course during this unit? (instruction, course materials, etc.)

  * Coding in a team is definitely something new to me and the initial part was abit rough in terms of ensuring that the different sections which me and my group mates are working on can link to one another, but I am glad it worked out fine in the end.
  * Overall teammates are very cooperative and approachable which makes the project much more bearable.





