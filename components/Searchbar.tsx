"use client";// Use of hooks and interactivity
import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react"; 

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    // Check if hostname contains aamazon related domains
    if (
      hostname.includes('amazon.com') ||
      hostname.includes('amazon.') ||
      hostname.endsWith('amazon')
    ) {
      return true;
    }

    
  } catch (error) {
    console.log(error);
  }
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent refresh of webpage when form is submitted

    const isValidLink = isValidAmazonProductURL(searchPrompt);
    if (!isValidLink) {
      return alert('Please enter a valid Amazon product link')
    }

    try {
      setIsLoading(true);

      // scrape product page
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
        className="flex flex-wrap gap-4 mt-12"
        onSubmit={handleSubmit}    
    >
      <input 
        type="text"
        value={searchPrompt}
        placeholder="Enter product link"
        onChange={(e) => { setSearchPrompt(e.target.value)}}
        className="searchbar-input"
      />

      <button 
        type="submit" 
        className="searchbar-btn"
        disabled={ searchPrompt === '' || isLoading }
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>

    </form>
  )
}

export default Searchbar