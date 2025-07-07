
  const facts = [
    " I enjoy reverse-engineering systems just to see how they tick—even if they weren’t broken.",
    " IBM Thinkpad Laptops are known to have some of the best keyboards in the world",
    " I trust my home server more than most cloud services - and yes, I have a backup for my backup.",
    " If something plugs in, I’ve probably tried to optimize or mod it.",
    " I prefer minimal UIs, modular setups, and software that doesn’t assume I’m a beginner.",
    " I learn best by breaking things on purpose - especially in my home lab.",
    " I run test environments just to see how things break - then document how to fix them.",
    " I’m always learning - whether it’s a new language, protocol, or system vulnerability.",
    " If it isn’t essential, it’s archived, compressed, or deleted."
  ];

  const a = Math.floor(Math.random() * facts.length);
  document.getElementById("randomFact").textContent = facts[a];

function switchCSS() {
}

function whatsTheTime() {
  const now = new Date();
  let hour = now.getHours();
  const minute = now.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM';

  // Convert 24-hour format to 12-hour format
  hour = hour % 12;
  hour = hour ? hour : 12; // Handle midnight (0 hour) as 12

  const newMinutes = minute < 10 ? '0' + minute : minute;

  document.getElementById("timeNow").innerHTML = hour + ":" + newMinutes + " " + ampm + " EST";
  document.getElementById("randomFact").innerHTML = facts[a];

}

function whatsTheTimeLocalized() {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  document.getElementById("timeNow").innerHTML = formattedTime + " EST";
}

whatsTheTime(); // Or whatsTheTimeLocalized();

function changeMyStyle(){
    const linkElement = document.querySelector('#theme-stylesheet');
    const currentHref = linkElement.href.split('/').pop();

    if (currentHref === 'style-dark.css') {
      linkElement.href = 'style-light.css';
      document.getElementById("genBtn").textContent="Turn the lights off!";
    } 
    else 
    {
      linkElement.href = 'style-dark.css';
      document.getElementById("genBtn").textContent="Turn the lights on!";

    }
  }

// fix and compressed webp version  later
function changeImg() {
    document.getElementById("avatarMain").src = "avatarWink.png";
}
function changeImg1() {
    document.getElementById("avatarMain").src = "avatarSmile.png";
}
function revert() {
    document.getElementById("avatarMain").src = "avatarDefault.png";
}


//toggle for MenuBarTop
  function toggleMenu() {
    document.getElementById('menu').classList.toggle('active');
  }


  function showHash() {
    const hashPart1 = '<b>SHA256(PDF):</b> 7500f0d03421e5cbdcbbffde65c3910a53e0d0a65487ed109f650081064c9ec2';
    const hashPart2 = '<b>SHA256(DOC):</b> ceca3b57b63197805aca5d2c2a8935a4c20aae3d024011ee4d25624b62405e42';
    const hashElement = document.getElementById('hash-value');
    
    hashElement.innerHTML = `${hashPart1}<br>${hashPart2}`;  // Adding <br> to break the line
    hashElement.hidden = false;
  }
  console.log(" I see you taking a look at the recipe... ;-) ");

  
