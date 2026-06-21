## 🧪 How to Demo / Use the Website

> **Note:** This build uses browser **localStorage** to simulate a real-time database for demo purposes — no external server or backend is required. Because of this, all actions must be performed within the **same browser** for data to sync correctly between the Bride and Artist views. Using two different browsers (or incognito mode) for opposite roles will not sync data, since each browser maintains its own isolated local storage.

### Step-by-Step Demo Flow

1. **Create an Artist account first**
   Sign up as an Artist, complete the profile (photo, bio, specialties, location), add 4–5 service packages, and upload portfolio images. This populates the artist's public-facing data.

2. **Log out, then sign up / log in as a Bride — in the same browser**
   Set your wedding date, then go to **Find Artists** and search for the artist you just created. Their profile should now appear with all the details you entered.

3. **Complete a full booking flow**
   Shortlist the artist → select a package → book an event date → go through the simulated payment (UPI/Card mock flow) → confirm advance payment.

4. **Switch back to the Artist account, same browser**
   Log out of the Bride account, log back into the Artist account. The booking request should now appear under **Booking Requests** with Accept/Reject options.

5. **Accept the booking as the Artist**
   This updates the booking status to **Confirmed** — switch back to the Bride account to confirm it reflects there too.

6. **Test messaging both ways**
   From the Bride side, message the artist. Switch to the Artist account and reply. Switch back to confirm the conversation synced correctly.

7. **Mark as Completed + Leave a Review**
   As the Artist, mark the booking as completed. As the Bride, submit a star rating and review — confirm it appears on the artist's public profile.

### ⚠️ Important Notes
- Always test/demo within **one single browser**, switching accounts via logout/login.
- Clearing browser site data (cookies/local storage) will reset all accounts and bookings, since there is no external database.
- For details on the AI-assisted development workflow used to build this project, see [`AI_USAGE.md`](./AI_USAGE.md).
