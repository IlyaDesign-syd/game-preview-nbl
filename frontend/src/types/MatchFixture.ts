/**
 * Interface for the nested Team object structure.
 */
interface TeamDetails {
    team_nickname: string;
    id: string;
    team_logo: string;
    team_logo_transparent: string;
    external_team_logo: string;
    // ... potentially other keys not shown
    [key: string]: any; 
}

/**
 * Interface for the nested Broadcaster object structure.
 * Note: Assumes `light_screen_logo` is a nested object, but typed as 'any' for simplicity.
 */
interface Broadcaster {
    id: string;
    url: string;
    logo_url: string;
    dark_screen_logo_url: string;
    // Assuming light_screen_logo is an object with unknown keys
    light_screen_logo: { [key: string]: any }; 
    // ... potentially other keys not shown
    [key: string]: any;
}

/**
 * Interface for the nested Season object structure.
 */
interface SeasonDetails {
    id: string;
    external_id: string;
    year: string;
    season_type: string;
    start_date: string;
    // ... potentially other keys not shown
    [key: string]: any;
}

/**
 * Interface for the nested Venue object structure.
 */
interface Venue {
    name: string;
    timezone: string;
}

/**
 * Main interface representing a single NBL Match Fixture.
 */
export interface MatchFixture {
    away_score: number | null;
    away_team: TeamDetails;
    broadcaster_gif: string | null;
    external_id: string;
    external_media_id: string | null;
    home_score: number | null;
    home_team: TeamDetails;
    id: string;
    match_slug: string;
    match_status: "scheduled" | "completed"; // Assuming statuses are restricted to a few strings
    match_ticket_url: string | null;
    match_title: string;
    odds: any | null; // Type as 'any' if the structure is complex or unknown
    organisation_shortcode: string;
    play_by_play: any | null; // Type as 'any' if the structure is complex or unknown
    primary_broadcaster: Broadcaster;
    quarternary_broadcaster: Broadcaster | null;
    round: string;
    season: SeasonDetails;
    secondary_broadcaster: Broadcaster | null;
    start_time: string; // ISO date string
    start_time_datetime: string; // ISO date string
    status: string; // Often redundant with match_status, but using generic string
    tertiary_broadcaster: Broadcaster | null;
    venue: Venue;
}
