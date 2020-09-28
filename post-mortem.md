## Approach and Process

1. What in my process and approach to this project would we do differently next time?

  * Communicate more and be clear on the call to action before starting on a task.
  * Before adding any features, be sure of solving the edge cases before deploying the feature to the app.
  * More robust testing and better error handling - should be a priority rather than an afterthought.
  * Planning the authentication methods could have been handled better. Quite a bit of time was spent trying to decide on
    the best way to determine if a particular client was a user or a seller, and that affected many of the core 
    functionality of our app.

2. What in my process and approach to this project went well that we would repeat next time?

  * We had strong user stories as well as a clearly defined problem to solve. We were direct in our approach in defining the functions required in our MVP to solve the problem.
  * We planned out our workflow clearly via drawing an ERD diagram , creating wireframes for each of the routes and also think through the set up of the app before starting to code.
  * Talking to my teammates when I was stuck helped me articulate and frame the problems better, and often resulted in a solution. 
  * Having more pairs of eyes on the code also made for quick debugging.

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

  * Integrating customised error handling pages for a better user experience.
  * Testing out more edge cases so we don't bug out.


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

  * Using React hooks gave me a lot of flexibility in designing the application, and gave better control over state management, which reduced the time needed for debugging. 

## WDI Unit 3 Post Mortem - Alvis

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


## WDI Unit 3 Post Mortem - Jarryl


What habits did I use during this unit that helped me?

* Having a robust discussion on the wireframing, ERD diagrams, routes planning and modelling as a team before the coding process
* Meeting up to clean up the code base and eliminate throwaway code so everyone has a clean copy to work on.
* Developing a more modular design mindset when it comes to group work and React.

What habits did I have during this unit that I can improve on?

* Take time to review each other's codes, check readability, catch logical errors, identify edge cases.
* Spend more time to discuss how to integrate components instead of rushing into developing the functionality right away, so we don't end up with technical debt.

How is the overall level of the course during this unit? (instruction, course materials, etc.)

* Good experience to work in teams. Can be better if there was more sharing on some of the ways teams can be structured, so we know what to expect in the industry.

## WDI Unit 3 Post Mortem - Joey

1. What habits did I use during this unit that helped me?

  * Proper indentation
  * Setting up error console logs at every point to help me figure out where the source was whenever i ran into a problem
  
2. What habits did I have during this unit that I can improve on?

  * Time management
  * Knowng when to take a break and then regrouping later
  * Communication!!!!!
  * Commenting - Helps you to understand your code better
  * Pseudo coding - Helps you to properly plan out the approach to fix problems and seed out other additional problems you might run into in the future.
  
3. How is the overall level of the course during this unit? (instruction, course materials, etc.)

  * Ample instructions were given and good advice was imparted from the start, which I really appreciate.
  * Teammates were accommodating and understanding, and helped me out a lot whenever I ran into trouble while coding.
