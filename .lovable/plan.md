

## Plan: Update Team Section

### Changes Required

1. **Remove 3 members**: Avinav Mahato, Shivraj Kumar Yadav, Rohit Chowdhury (and their unused imports)

2. **Update roles**:
   - Sambharam G → "Co-Founder & Managing Director (MD)"
   - Zulfequar Ahmad → "Co-Founder & Chief Operating Officer (COO)"

3. **Add new member**: Anmol Yadav as "Co-Founder & Director of Operations (DOO)" with a default mission and placeholder image (no photo provided)

4. **Update chatbot knowledge** in `supabase/functions/franchise-chat/index.ts` to reflect new team structure and redeploy

### Files to Edit
- `src/components/sections/TeamSection.tsx` — remove 3 members, update 2 roles, add Anmol Yadav
- `supabase/functions/franchise-chat/index.ts` — update team list in system prompt, redeploy

### Final Team Order
1. Abhishek Roy — Founder & CEO
2. Druva SM — Co-Founder & CTO
3. Sambharam G — Co-Founder & MD
4. Zulfequar Ahmad — Co-Founder & COO
5. Anmol Yadav — Co-Founder & DOO
6. Aditya Paswan — Group Ops Team

> **Note**: Anmol Yadav ka photo nahi hai, toh placeholder image use hoga. Agar photo add karna ho toh baad mein upload kar sakte ho.

