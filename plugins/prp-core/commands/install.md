# Install PRP Templates and Configure MCP

## Task 1: Install PRP Templates

1. Check if `PRPs` directory exists in project root
   - If exists: ask user to overwrite/skip/backup
   - If not: proceed to download

2. Download PRPs from GitHub:

   ```bash
   # Use git sparse checkout
   mkdir -p /tmp/prp-install && cd /tmp/prp-install
   git init && git remote add origin https://github.com/NanoBoom/nano-claude-code-plugins.git
   git config core.sparseCheckout true
   echo "PRPs/*" > .git/info/sparse-checkout
   git pull origin main
   cp -r PRPs <project-root>/
   rm -f <project-root>/PRPs/templates/prp_*.md
   rm -rf /tmp/prp-install
   ```

3. Verify: List templates and count total files

## Task 2: Add MCP Server Configuration

After installing the PRP templates, configure the MCP (Model Context Protocol) server:

### Step 1: Check existing MCP configuration

1. Check if `.mcp.json` exists in project root
2. If file exists:
   - Read the current `.mcp.json` file
   - Check if `context7` server already exists in `mcpServers`
   - If `context7` exists: Skip this task (inform user that context7 is already configured)
   - If `context7` doesn't exist: Proceed to Step 2
3. If file doesn't exist: Proceed to Step 2

### Step 2: Add context7 configuration

The context7 configuration to add:

```json
{
  "context7": {
    "type": "http",
    "url": "https://mcp.context7.com/mcp",
    "headers": {
      "CONTEXT7_API_KEY": "YOUR_API_KEY"
    }
  }
}
```

**Actions:**

- If `.mcp.json` exists: Merge context7 into existing `mcpServers` object
- If `.mcp.json` doesn't exist: Create new file with context7 configuration
- Ensure proper JSON formatting and indentation after modification

### Step 3: Verify configuration

1. **Validate JSON**: Parse the modified/created `.mcp.json` to ensure valid syntax
2. **Confirm context7 addition**: Verify that context7 server is present in the configuration
3. **Display result**:
   - If added: "✅ Context7 MCP server added to configuration"
   - If skipped: "ℹ️ Context7 server already configured, skipping"
   - Remind user: "⚠️ Replace `YOUR_API_KEY` with your actual Context7 API key"
   - Note: "🔄 Restart your development environment to activate changes"

## Task 3: Add Project Documentation Template

After configuring the MCP server, set up the project documentation:

### Step 1: Check existing CLAUDE.md file

1. Check if `CLAUDE.md` exists in project root
2. If file exists:
   - Read the current `CLAUDE.md` file
   - Proceed to Step 2 to append content
3. If file doesn't exist:
   - Proceed to Step 2 to create new file

### Step 2: Add/Create documentation template

The template location: PRPS/templates/CLAUDE.md

**Actions:**

- If `CLAUDE.md` exists: Append the template content to the end of the file
- If `CLAUDE.md` doesn't exist: Create new file with the template content
- Add a blank line before the appended content if the file already exists

### Step 3: Verify documentation file

1. **Validate file creation/update**: Confirm that `CLAUDE.md` exists in project root
2. **Display result**:
   - If appended: "✅ Documentation template added to existing CLAUDE.md"
   - If created: "✅ CLAUDE.md created with documentation template"
   - Note: "📝 Please fill in the project overview, structure, and development tools sections"

## Error Handling

- If the GitHub repository is not accessible, provide clear error message
- If there are permission issues, suggest running with appropriate permissions
- If network issues occur, suggest retrying or manual installation steps
- If file write operations fail, check file permissions and disk space

Please proceed with the installation now.
