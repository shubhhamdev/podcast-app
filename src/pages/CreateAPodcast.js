import React from 'react';
import Header from '../components/Common/Header/Header';
import CreatePodcastForm from '../components/StartAPodcast/StartAPodcast';

function CreateAPodcastPage() {
  return (
    <div>
      <Header />
      <div className="input-wrapper space">
        <h1>Create A Podcast</h1>
        <CreatePodcastForm />
      </div>
    </div>
  )
}

export default CreateAPodcastPage;